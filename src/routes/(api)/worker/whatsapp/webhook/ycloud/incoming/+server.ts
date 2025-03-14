import { json, error, pino } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import { yCloudWebhook } from '$lib/schema/communications/whatsapp/webhooks/ycloud';
const log = pino(import.meta.url);

import { create as createReceivedMessage } from '$lib/server/api/communications/whatsapp/received_messages';
import { create as createInteraction } from '$lib/server/api/people/interactions';
import { create as createInteractionSchema } from '$lib/schema/people/interactions';
import { _getPersonByWhatsappId } from '$lib/server/api/people/people';
import { triggerAction } from '$lib/schema/communications/actions/actions';
import { _getByAction } from '$lib/server/api/communications/whatsapp/messages.js';
import { _idempotentUpdateExpiryTime } from '$lib/server/api/communications/whatsapp/conversations.js';

export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(yCloudWebhook, body);
		if (parsed.type === 'whatsapp.inbound_message.received') {
			//const contact = value.contacts[index];
			const person = await _getPersonByWhatsappId({
				t: event.locals.t,
				instanceId: event.locals.instance.id,
				whatsappId: parsed.whatsappInboundMessage.from
			});
			const receivedMessageToCreate = {
				person_id: person.id,
				message_id: parsed.whatsappInboundMessage.id,
				message: parsed.whatsappInboundMessage
			};
			const receivedMessage = await createReceivedMessage({
				instanceId: event.locals.instance.id,
				body: receivedMessageToCreate,
				t: event.locals.t
			});
			const message = parsed.whatsappInboundMessage;
			// generate an inbound_whatsapp artifact to save in the database
			const interaction = {
				person_id: person.id,
				admin_id: event.locals.admin.id,
				details: {
					type: 'inbound_whatsapp',
					message_id: receivedMessage.id,
					message: parsed.whatsappInboundMessage //this is the message object.
				}
			};
			const interactionParsed = parse(createInteractionSchema, interaction);

			await createInteraction({
				instanceId: event.locals.instance.id,
				body: interactionParsed,
				t: event.locals.t
			});

			// if the message type is button... then find the matching message to the interactive ID.
			if (message.type === 'button') {
				try {
					if (message.button && message.button && message.button.payload) {
						const payload = message.button.payload; //this is the uuid of the action...
						const actionParsed = parse(triggerAction, {
							type: 'whatsapp_message',
							person_id: person.id,
							received_whatsapp_message_id: receivedMessage.id,
							action_id: payload
						});
						await event.locals.queue(
							'/utils/communications/actions',
							event.locals.instance.id,
							actionParsed,
							event.locals.admin.id
						);
					}
				} catch (err) {
					log.error(err);
				}
			}
		}
		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'WORKER:/webhooks/whatsapp/+server.ts',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
