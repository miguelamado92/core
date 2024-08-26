import { type IncomingWebhook } from '$lib/schema/communications/whatsapp/whapi/incoming';
import { type Message } from '$lib/schema/communications/whatsapp/webhooks/messages';
import { BelcodaError } from '$lib/server';
export default function input(m: IncomingWebhook): Message {
	if (!Array.isArray(m.messages) || m.messages.length <= 0) {
		throw new BelcodaError(
			400,
			'WORKER:/worker/whatsapp/whapi/webhook:POST:02',
			'No messages found in the webhook'
		);
	}
	const message = m.messages[0];
	const base = {
		id: message.id,
		from: message.from,
		timestamp: new Date(message.timestamp).toISOString()
	};
	switch (message.type) {
		case 'text': {
			return {
				...base,
				type: 'text',
				text: { body: message.text.body }
			};
		}
		case 'link_preview': {
			return {
				...base,
				type: 'text',
				text: { body: message.link_preview.body }
			};
		}
		default: {
			return {
				...base,
				type: 'text',
				text: { body: 'Unsupported message type' }
			};
		}
	}
}
