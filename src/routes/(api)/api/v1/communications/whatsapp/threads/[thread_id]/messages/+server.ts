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
			'API:/communications/whatsapp/threads/[thread_id]/messages:GET',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function POST(event) {
	try {
		const itemId = Number(event.params.thread_id);
		const body = await event.request.json();
		const result = await api.create({
			instanceId: event.locals.instance.id,
			threadId: itemId,
			body
		});
		return json(result);
	} catch (err) {
		return error(
			500,
			'API:/communications/whatsapp/threads/[thread_id]/messages:POST',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
