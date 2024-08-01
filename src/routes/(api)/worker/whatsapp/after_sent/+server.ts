import { json, error, BelcodaError } from '$lib/server';
import { afterSend } from '$lib/schema/communications/whatsapp/worker/sending';
import { create as createInteraction } from '$lib/server/api/people/interactions';
import { create as createInteractionSchema } from '$lib/schema/people/interactions';
import { read as readMessage } from '$lib/server/api/communications/whatsapp/messages';
import { parse } from '$lib/schema/valibot';
import { _readSecretsUnsafe } from '$lib/server/api/core/instances';
import { _updateWhatsappId, read } from '$lib/server/api/people/people';
import { create as createSentMessage } from '$lib/server/api/communications/whatsapp/sent_messages';
import { type Create } from '$lib/schema/communications/whatsapp/sent_whatsapp_messages';

export async function POST(event) {
	try {
		const body = await event.request.json();
		//body needs response (ie: whatsapp successful response + personId, messageId, message, fromAdminId, )
		const parsed = parse(afterSend, body);
		//for each contacts, update whatsapp id
		for (const contact of parsed.whatsapp_response.contacts) {
			//update contact
			await _updateWhatsappId({
				instanceId: event.locals.instance.id,
				personId: parsed.person_id,
				whatsappId: contact.wa_id
			});
		}
		//for each messages, create a sent message.
		for (const sentMessage of parsed.whatsapp_response.messages) {
			//create sent message
			const sentMessageBody: Create = {
				person_id: parsed.person_id,
				message_id: parsed.message_id,
				message: parsed.message,
				wamid: sentMessage.id
			};
			//TODO: Handle situations where message.message_status is not 'accepted', but rather sent for quality evaulation. The sent message should make that v.clear
			await createSentMessage({
				instanceId: event.locals.instance.id,
				body: sentMessageBody,
				t: event.locals.t
			});

			const interaction = {
				person_id: parsedMessage.person_id,
				admin_id: parsedMessage.from_admin_id,
				details: {
					type: 'outbound_whatsapp',
					message_id: parsedMessage.message_id,
					message: message.message
				}
			};
			const interactionParsed = parse(createInteractionSchema, interaction);
			await createInteraction({
				instanceId: event.locals.instance.id,
				body: interactionParsed,
				t: event.locals.t
			});
		}

		//this is when we have a message that should immediately have a message sent out after it. Eg, we send an image, then ask a question about that image in the following message.
		if (message.next) {
			const nextMessage = await readMessage({
				instanceId: event.locals.instance.id,
				messageId: message.next,
				t: event.locals.t
			});
			const toSend = {
				person_id: parsedMessage.person_id,
				message_id: message.next,
				message: nextMessage.message,
				from_admin_id: parsedMessage.from_admin_id
			};
			await event.locals.queue(
				'/whatsapp/send_message',
				event.locals.instance.id,
				toSend,
				event.locals.admin.id
			);
		}

		return json({ success: true });
	} catch (err) {
		return error(500, 'WORKER:/whatsapp/after_sent:01', event.locals.t.errors.http[500](), err);
	}
}
