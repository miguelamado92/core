import * as api from '$lib/server/api/people/lists';
import * as schema from '$lib/schema/people/lists';
import { parse } from '$lib/schema/valibot';
import { json, error } from '$lib/server';

export async function GET(event) {
	try {
		const listData = await api.list({ instanceId: event.locals.instance.id, url: event.url });
		return json(listData);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/people/[person_id]/lists:GET',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(schema.create, body);
		const list = await api.create({
			instanceId: event.locals.instance.id,
			body: parsed,
			t: event.locals.t
		});
		return json(list, { status: 201 });
	} catch (err) {
		return error(500, 'API:/api/v1/people/lists/:POST', event.locals.t.errors.http[500](), err);
	}
}
