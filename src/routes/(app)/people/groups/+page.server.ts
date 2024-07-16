import { filter, loadError } from '$lib/server';
import { list } from '$lib/schema/people/groups';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const response = await event.fetch(filter('/api/v1/people/groups', event.url));
	if (!response.ok) return loadError(response);
	const body = await response.json();
	const parsed = parse(list, body);
	return { groups: parsed };
}
