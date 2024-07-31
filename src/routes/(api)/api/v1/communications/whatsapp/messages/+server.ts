import { error, json } from '$lib/server';
import * as api from '$lib/server/api/communications/whatsapp/messages';

export async function POST(event) {
	try {
		const body = await event.request.json();
		const result = await api.create({
			instanceId: event.locals.instance.id,
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
