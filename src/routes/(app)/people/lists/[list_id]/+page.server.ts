import { loadError } from '$lib/server';
import { readListWithPeople } from '$lib/schema/people/lists';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const result = await event.fetch(`/api/v1/people/lists/${event.params.list_id}`);
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(readListWithPeople, body);
	return { list: parsed, pageTitle: [{ key: 'LISTNAME', title: parsed.name }] };
}
