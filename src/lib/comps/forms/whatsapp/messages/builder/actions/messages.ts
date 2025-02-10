import { type Read, read, list } from '$lib/schema/communications/whatsapp/messages';
import { type Message } from '$lib/schema/communications/whatsapp/elements/message';
import { parse } from '$lib/schema/valibot';
export const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/500x250';

export async function updateMessage(message: Read): Promise<Read> {
	const res = await fetch('/api/v1/communications/whatsapp/messages/' + message.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message: message.message,
			actions: message.actions
		})
	});
	const json = await res.json();
	return parse(read, json);
}

export async function createNewMessage(message: Message, threadId: number) {
	const res = await fetch(`/api/v1/communications/whatsapp/messages`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			thread_id: threadId,
			message: message
		})
	});
	if (!res.ok) alert('Error!');
}
