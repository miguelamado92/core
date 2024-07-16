import { json, error } from '$lib/server/';
import * as api from '$lib/server/api/website/templates';

export async function GET(event) {
	try {
		const templates = await api.list({
			instanceId: event.locals.instance.id,
			url: event.url
		});
		return json(templates);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/website/templates:GET01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function POST(event) {
	try {
		const body = await event.request.json();
		const createdTemplate = await api.create({
			instanceId: event.locals.instance.id,
			body
		});
		return json(createdTemplate);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/website/templates:POST01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
