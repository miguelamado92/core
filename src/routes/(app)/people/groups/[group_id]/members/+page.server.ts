import { filter, loadError } from '$lib/server';
import { read } from '$lib/schema/people/groups';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const response = await event.fetch(
		filter(`/api/v1/people/groups/${event.params.group_id}`, event.url)
	);
	if (!response.ok) return loadError(response);
	const body = await response.json();

	const parsed = parse(read, body);
	return { group: parsed, pageTitle: [{ key: 'GROUPNAME', title: parsed.name }] };
}
