import { json, error } from '$lib/server/';
import * as api from '$lib/server/api/website/blocks';

export async function GET(event) {
	try {
		const readTemplate = await api.read({
			instanceId: event.locals.instance.id,
			t: event.locals.t,
			blockId: Number(event.params.block_id)
		});
		return json(readTemplate);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/website/blocks/[block_id]:GET01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function PUT(event) {
	try {
		const body = await event.request.json();
		const updatedTemplate = await api.update({
			instanceId: event.locals.instance.id,
			blockId: Number(event.params.block_id),
			body,
			t: event.locals.t
		});
		return json(updatedTemplate);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/website/blocks/[block_id]:PUT01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
