import { json, error } from '$lib/server';
import * as api from '$lib/server/api/people/taggings';
export async function GET(event) {
	try {
		const listData = await api.list({
			instanceId: event.locals.instance.id,
			personId: Number(event.params.person_id),
			t: event.locals.t
		});
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
