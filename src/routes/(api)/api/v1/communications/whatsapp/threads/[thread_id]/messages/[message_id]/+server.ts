import { error, json } from '$lib/server';
import * as api from '$lib/server/api/communications/whatsapp/messages';

export async function GET(event) {
	try {
		const itemId = Number(event.params.thread_id);
		const result = await api.list({
			instanceId: event.locals.instance.id,
			threadId: itemId,
			url: event.url
		});
		return json(result);
	} catch (err) {
		return error(
			500,
			'API:/communications/whatsapp/threads/[thread_id]/messages/[message_id]:GET',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function PUT(event) {
	try {
		const itemId = Number(event.params.thread_id);
		const messageId = event.params.message_id;
		const body = await event.request.json();
		const result = await api.update({
			instanceId: event.locals.instance.id,
			threadId: itemId,
			messageId: messageId,
			body,
			t: event.locals.t
		});
		return json(result);
	} catch (err) {
		return error(
			500,
			'API:/communications/whatsapp/threads/[thread_id]/messages/[message_id]:PUT',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
