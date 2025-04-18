import { json, error, pino } from '$lib/server';
import { triggerEventMessage, type SendEventEmailMessage } from '$lib/schema/utils/email';
import { read as readPerson } from '$lib/server/api/people/people';
import { read as readEvent } from '$lib/server/api/events/events';
const log = pino(import.meta.url);
import * as m from '$lib/paraglide/messages';
import { queue as queueInteraction } from '$lib/server/api/people/interactions';
import { parse } from '$lib/schema/valibot';

export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(triggerEventMessage, body);
		log.debug(parsed, 'Send cancellation email initated');
		const eventResponse = await readEvent({
			instanceId: event.locals.instance.id,
			eventId: parsed.event_id,
			t: event.locals.t
		});

		if (eventResponse.send_cancellation_email === false) {
			log.debug('No cancellation email required');
			return json({ success: true, message: 'No cancellation email required' });
		}

		const personResponse = await readPerson({
			instance_id: event.locals.instance.id,
			person_id: parsed.person_id,
			t: event.locals.t
		});

		const sendToQueue: SendEventEmailMessage = {
			instance: event.locals.instance,
			person: personResponse,
			event: eventResponse,
			details: {
				type: 'event_cancellation',
				event_id: eventResponse.id
			},
			template: 'event_cancelled'
		};
		await event.locals.queue(
			'utils/email/send_event_email',
			event.locals.instance.id,
			sendToQueue,
			event.locals.admin.id
		);

		log.debug(sendToQueue, 'Sent event email to queue with these details');

		await queueInteraction({
			instanceId: event.locals.instance.id,
			personId: personResponse.id,
			adminId: event.locals.admin.id,
			details: {
				type: 'received_event_cancellation_email',
				event_id: eventResponse.id,
				event_name: eventResponse.name
			},
			queue: event.locals.queue
		});

		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'WORKER:/utils/email/events/send_registration_email:01',
			m.teary_dizzy_earthworm_urge(),
			err
		);
	}
}
