import { json, error } from '$lib/server';
import * as api from '$lib/server/api/core/task_taggings';

export async function GET(event) {
	try {
		const listData = await api.list({
			instanceId: event.locals.instance.id,
			taskId: Number(event.params.task_id),
			t: event.locals.t
		});
		return json(listData);
	} catch (err) {
		return error(
			500,
			'API:/api/v1/tasks/[task_id]/tags:GET',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
