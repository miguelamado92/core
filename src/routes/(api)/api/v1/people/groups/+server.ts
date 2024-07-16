import { json, error } from '$lib/server';
import * as api from '$lib/server/api/people/groups';

export async function GET(event) {
	try {
		const list = await api.list({
			instanceId: event.locals.instance.id,
			url: event.url,
			t: event.locals.t
		});
		return json(list);
	} catch (err) {
		return error(500, 'API:/people/groups:GET:01', event.locals.t.errors.http[500](), err);
	}
}

export async function POST(event) {
	try {
		const body = await event.request.json();
		const group = await api.create({
			instanceId: event.locals.instance.id,
			adminId: event.locals.admin.id,
			body: body,
			url: event.url,
			t: event.locals.t
		});
		return json(group, { status: 201 });
	} catch (err) {
		return error(500, 'API:/people/groups:POST:01', event.locals.t.errors.http[500](), err);
	}
}
