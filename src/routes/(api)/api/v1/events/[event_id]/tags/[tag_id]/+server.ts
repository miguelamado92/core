import { json, error } from '$lib/server';
import * as api from '$lib/server/api/events/taggings';

export async function POST(event) {
	try {
		const tagId = Number(event.params.tag_id);
		const eventId = Number(event.params.event_id);
		const list = await api.create({
			instanceId: event.locals.instance.id,
			eventId,
			tagId,
			t: event.locals.t
		});
		return json(list, { status: 201 });
	} catch (err) {
		return error(
			500,
			'API:/api/v1/events/[event_id]/tags/[tag_id]:POST',
			event.locals.t.errors.http[500](),
			err
		);
	}
}

export async function DELETE(event) {
	try {
		const eventId = Number(event.params.event_id);
		const tagId = Number(event.params.tag_id);
		const deleted = await api.del({
			instanceId: event.locals.instance.id,
			eventId,
			tagId,
			t: event.locals.t
		});
		return json(deleted);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/events/[event_id]/tags/[tag_id]:DELETE',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
