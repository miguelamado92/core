import { json, error, pino, BelcodaError } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import {
	yCloudWebhook,
	type WhatsappInboundMessage
} from '$lib/schema/communications/whatsapp/webhooks/ycloud';
const log = pino('WORKER:/webhooks/whatsapp/+server.ts');

import { create as createReceivedMessage } from '$lib/server/api/communications/whatsapp/received_messages';
import { create as createInteraction } from '$lib/server/api/people/interactions';
import { create as createInteractionSchema } from '$lib/schema/people/interactions';
import { _createPersonByWhatsappId, _getPersonByWhatsappId } from '$lib/server/api/people/people';
import { triggerAction } from '$lib/schema/communications/actions/actions';
import { _getByAction } from '$lib/server/api/communications/whatsapp/messages.js';
import { _idempotentUpdateExpiryTime } from '$lib/server/api/communications/whatsapp/conversations.js';
import { _getInstanceIdByEventId } from '$lib/server/api/core/instances.js';
import type { RequestEvent } from './$types.js';

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
			} else if (message.type === 'text') {
				// Pick out the string [#4fg6XFDE32:3] in the message
				// and split it into #4fg6XFDE32 and 3.
				if (!message.text) {
					throw new Error('No message text found');
				}
				const pattern = /\[(#[A-Za-z0-9]+:[0-9])\]/;
				const identifier = pattern.exec(message.text.body);
				if (!identifier || !identifier[1]) {
					throw new Error('No identifier found');
				}

				const parts = identifier[1].split(/:(\d+)/);
				if (parts.length > 1) {
					const action = parts[0];
					const eventId = parts[1];
					console.log(action, eventId);
					switch (action) {
						case '#4fg6XFDE32':
							registerPersonForEvent(eventId, message, event);
							break;
						default:
							return error(
								400,
								'WORKER:/webhooks/whatsapp/+server.ts',
								'Unknown action' // TODO: i18n this
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

//TODO: This should be in a queue
async function registerPersonForEvent(
	eventId: string,
	message: WhatsappInboundMessage,
	event: RequestEvent
) {
	const instance = await _getInstanceIdByEventId(eventId);
	let person;
	try {
		person = await _getPersonByWhatsappId({
			instanceId: instance.id,
			whatsappId: message.from,
			t: event.locals.t
		});
	} catch (err) {
		if (err instanceof BelcodaError && err.code === 404) {
			console.log('Person not found by whatsappId. Creating person');
			person = await _createPersonByWhatsappId({
				instanceId: instance.id,
				whatsappId: message.from,
				name: message.customerProfile?.name,
				t: event.locals.t,
				queue: event.locals.queue
			});
		} else {
			throw err;
		}
	}

	if (person) {
		// TODO: Work in progress: Actions don't work like this. Refractor!
		const actionParsed = parse(triggerAction, {
			type: 'whatsapp_message',
			person_id: person.id,
			event_id: eventId,
			person,
			message
		});
		await event.locals.queue(
			'/utils/communications/actions',
			event.locals.instance.id,
			actionParsed,
			event.locals.admin.id
		);
	}
}
