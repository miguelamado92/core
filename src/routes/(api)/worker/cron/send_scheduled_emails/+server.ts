import { json, error, pino } from '$lib/server';
import { type TriggerEventMessage } from '$lib/schema/utils/email';
import {
	selectEventsForReminderFollowupEmail,
	update as updateEvent
} from '$lib/server/api/events/events';
import { unsafeListAllForEvent } from '$lib/server/api/events/attendees';
const log = pino('/worker/utils/email/events/send_followup_email');

export async function POST(event) {
	try {
		const { followups, reminders } = await selectEventsForReminderFollowupEmail();
		//followups
		await queueEmailsToAttendees({
			t: event.locals.t,
			eventObjects: followups,
			queue: event.locals.queue,
			type: 'followup'
		});
		//reminders
		await queueEmailsToAttendees({
			t: event.locals.t,
			eventObjects: reminders,
			queue: event.locals.queue,
			type: 'reminder'
		});
		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'WORKER:/utils/email/events/send_followup_email:01',
			event.locals.t.errors.generic(),
			err
		);
	}
}

async function queueEmailsToAttendees({
	t,
	eventObjects,
	queue,
	type
}: {
	t: App.Localization;
	eventObjects: { id: number; instance_id: number; point_person_id: number }[];
	queue: App.Queue;
	type: 'reminder' | 'followup';
}) {
	for (let index = 0; index < eventObjects.length; index++) {
		const eventObject = eventObjects[index];
		const attendees = await unsafeListAllForEvent({
			instanceId: eventObject.instance_id,
			eventId: eventObject.id
		});
		for (let index = 0; index < attendees.length; index++) {
			const attendee = attendees[index];
			if (attendee.send_notifications && attendee.status === 'registered') {
				const sendToQueue: TriggerEventMessage = {
					person_id: attendee.person_id,
					event_id: eventObject.id
				};
				await queue(
					'utils/email/events/send_reminder_email',
					eventObject.instance_id,
					sendToQueue,
					eventObject.point_person_id
				);
			}
		}
		await updateEvent({
			instanceId: eventObject.instance_id,
			eventId: eventObject.id,
			body: { followup_sent_at: new Date(Date.now()) },
			t: t,
			queue: queue,
			skipMetaGeneration: true
		});
	}
}
