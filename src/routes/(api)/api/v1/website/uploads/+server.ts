import { json, error } from '$lib/server/';
import * as api from '$lib/server/api/website/uploads';

export async function GET(event) {
	try {
		const uploads = await api.list({
			instanceId: event.locals.instance.id,
			url: event.url
		});
		return json(uploads);
	} catch (err) {
		return error(500, 'API:/api/v1/website/uploads:GET01', event.locals.t.errors.http[500](), err);
	}
}

export async function POST(event) {
	try {
		const body = await event.request.json();
		const created = await api.create({
			instanceId: event.locals.instance.id,
			body
		});
		return json(created);
	} catch (err) {
		return error(500, 'API:/api/v1/website/uploads:POST01', event.locals.t.errors.http[500](), err);
	}
}
