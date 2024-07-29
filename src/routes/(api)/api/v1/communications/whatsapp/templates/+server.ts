import { error, json } from '$lib/server';
import * as api from '$lib/server/api/communications/whatsapp/templates';

export async function GET(event) {
	try {
		const result = await api.list({ instanceId: event.locals.instance.id, url: event.url });
		return json(result);
	} catch (err) {
		return error(
			500,
			'API:/communications/whatsapp/templates:GET',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
