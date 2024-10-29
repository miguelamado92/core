import { error, json } from '$lib/server';
import * as schema from '$lib/schema/people/imports';
import * as api from '$lib/server/api/people/imports';
import { parse } from '$lib/schema/valibot';
export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(schema.create, body);
		const result = await api.create({
			instanceId: event.locals.instance.id,
			csvUrl: parsed.csv_url,
			queue: event.locals.queue,
			adminId: event.locals.admin.id
		});
		return json(result);
	} catch (e) {
		return error(500, 'API:/api/v1/people/imports:POST:01', event.locals.t.errors.http[500](), e);
	}
}

export async function GET(event) {
	try {
		const result = await api.list({
			instanceId: event.locals.instance.id,
			url: event.url
		});
		return json(result);
	} catch (e) {
		return error(500, 'API:/api/v1/people/imports:GET:01', event.locals.t.errors.http[500](), e);
	}
}
