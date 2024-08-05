import { json, error, BelcodaError } from '$lib/server';
import {
	successfulResponse,
	sendMessage,
	type MessageWithBase
} from '$lib/schema/communications/whatsapp/elements/message';
import { read as readMessage } from '$lib/server/api/communications/whatsapp/messages';
import { parse } from '$lib/schema/valibot';
import { _readSecretsUnsafe } from '$lib/server/api/core/instances';
import { _updateWhatsappId, read } from '$lib/server/api/people/people';

import type { AfterSend } from '$lib/schema/communications/whatsapp/worker/sending.js';
export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsedMessage = parse(sendMessage, body);
		const { WHATSAPP_ACCESS_KEY } = await _readSecretsUnsafe({
			instanceId: event.locals.instance.id
		});
		const PHONE_NUMBER_ID = event.locals.instance.settings.communications.whatsapp.phone_number_id;
		const person = await read({
			instance_id: event.locals.instance.id,
			person_id: parsedMessage.person_id,
			t: event.locals.t
		});
		const message = await readMessage({
			instanceId: event.locals.instance.id,
			messageId: parsedMessage.message_id,
			t: event.locals.t
		});

		if (!person.phone_number?.phone_number) {
			throw new BelcodaError(
				400,
				'DATA:/whatsapp/send_message/+server.ts:01',
				event.locals.t.errors.generic()
			);
		}
		const messageBody: MessageWithBase = {
			to: person.phone_number?.phone_number,
			biz_opaque_callback_data: parsedMessage.message_id,
			messaging_product: 'whatsapp',
			recipient_type: 'individual',
			...message.message
		};
		const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
			body: JSON.stringify(messageBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${WHATSAPP_ACCESS_KEY}`
			},
			method: 'POST'
		});
		if (response.ok) {
			const body = await response.json();
			const parsed = parse(successfulResponse, body);

			const afterSendBody: AfterSend = {
				message_id: parsedMessage.message_id,
				sent_by_id: parsedMessage.from_admin_id,
				person_id: parsedMessage.person_id,
				message: message.message,
				whatsapp_response: parsed
			};
			await event.locals.queue(
				'/whatsapp/after_sent',
				event.locals.instance.id,
				afterSendBody,
				event.locals.admin.id
			);
		} else {
			console.log('Whatsapp responded with an error');
			console.log(response.status);
			console.log(await response.json());
		}
		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'WORKER:/whatsapp/send_message/+server.ts',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
