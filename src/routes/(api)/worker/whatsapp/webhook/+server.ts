import { json, error, pino } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import { webhook } from '$lib/schema/communications/whatsapp/webhooks/webhook';
const log = pino('WORKER:/webhooks/whatsapp/+server.ts');

import { create as createReceivedMessage } from '$lib/server/api/communications/whatsapp/received_messages';
import { create as createInteraction } from '$lib/server/api/people/interactions';
import { create as createInteractionSchema } from '$lib/schema/people/interactions';
import { _getPersonByWhatsappId } from '$lib/server/api/people/people';
import { triggerAction } from '$lib/schema/communications/actions/actions';

export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(webhook.entries.entry.item.entries.changes.item, body);
		const value = parsed.value;
		if (value.messages && value.contacts) {
			for (let index = 0; index < value.messages.length; index++) {
				const message = value.messages[index];
				//const contact = value.contacts[index];
				//TODO: need to fix phone number matching, because at the moment everyone's phone number is stored in the database in a non-normalized format.
				const person = await _getPersonByWhatsappId({
					t: event.locals.t,
					instanceId: event.locals.instance.id,
					whatsappId: message.from
				});
				const receivedMessageToCreate = {
					person_id: person.id,
					message_id: message.id,
					message: message
				};
				const receivedMessage = await createReceivedMessage({
					instanceId: event.locals.instance.id,
					body: receivedMessageToCreate,
					t: event.locals.t
				});

				// generate an inbound_whatsapp artifact to save in the database
				const interaction = {
					person_id: person.id,
					admin_id: event.locals.admin.id,
					details: {
						type: 'inbound_whatsapp',
						message_id: receivedMessage.id,
						message: message
					}
				};
				const interactionParsed = parse(createInteractionSchema, interaction);

				await createInteraction({
					instanceId: event.locals.instance.id,
					body: interactionParsed,
					t: event.locals.t
				});

				// if the message type is interactive... then find the matching message to the interactive ID.
				if (message.type === 'interactive') {
					if (message.interactive.type.button_reply) {
						const actionId = message.interactive.type.button_reply.id;
						const actionParsed = parse(triggerAction, {
							person_id: person.id,
							received_whatsapp_message_id: receivedMessage.id,
							action_id: actionId
						});
						await event.locals.queue(
							'/communications/actions',
							event.locals.instance.id,
							actionParsed,
							event.locals.admin.id
						);
					}
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
