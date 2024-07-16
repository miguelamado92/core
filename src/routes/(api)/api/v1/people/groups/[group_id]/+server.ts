import { json, error } from '$lib/server';
import * as api from '$lib/server/api/people/groups';

export async function GET(event) {
	try {
		const list = await api.read({
			instanceId: event.locals.instance.id,
			groupId: Number(event.params.group_id),
			url: event.url,
			t: event.locals.t
		});
		return json(list);
	} catch (err) {
		return error(
			500,
			'API:/people/groups/[group_id]:GET:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function PUT(event) {
	try {
		const body = await event.request.json();
		const group = await api.update({
			instanceId: event.locals.instance.id,
			groupId: Number(event.params.group_id),
			body: body,
			t: event.locals.t,
			url: event.url
		});
		return json(group, { status: 201 });
	} catch (err) {
		return error(
			500,
			'API:/people/groups/[group_id]:PUT:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
