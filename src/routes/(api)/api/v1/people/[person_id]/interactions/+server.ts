import { json, error } from '$lib/server';
import { list, create } from '$lib/server/api/people/interactions';

export async function GET(event) {
	try {
		const interactions = await list({
			instanceId: event.locals.instance.id,
			personId: Number(event.params.person_id),
			url: event.url
		});
		return json(interactions);
	} catch (err) {
		return error(
			500,
			'API:/people/:person_id/interactions:GET:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function POST(event) {
	try {
		const body = await event.request.json();
		const interactions = await create({
			instanceId: event.locals.instance.id,
			body,
			t: event.locals.t
		});
		return json(interactions);
	} catch (err) {
		return error(
			500,
			'API:/people/:person_id/interactions:POST:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
