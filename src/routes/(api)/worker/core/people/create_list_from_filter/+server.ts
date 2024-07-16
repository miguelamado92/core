import { json } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import { createListFromFilter } from '$lib/schema/people/filters/filters';
import { outputIdsFromFilterGroup } from '$lib/server/api/people/filters/filters';
export async function POST(event) {
	const body = await event.request.json();
	const parsed = parse(createListFromFilter, body);
	const ids = await outputIdsFromFilterGroup(event.locals.instance.id, parsed.filter);
	for (let index = 0; index < ids.length; index++) {
		const id = ids[index];
		await event.locals.queue(
			'/core/people/add_to_list',
			event.locals.instance.id,
			{
				list_id: parsed.list_id,
				person_id: id
			},
			event.locals.admin.id
		);
	}
	return json({ success: true });
}
