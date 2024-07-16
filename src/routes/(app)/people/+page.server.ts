import { filter, loadError } from '$lib/server';
import { list } from '$lib/schema/people/people';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const response = await event.fetch(filter('/api/v1/people', event.url));
	if (!response.ok) return loadError(response);
	const body = await response.json();
	const parsed = parse(list, body);
	return { people: parsed };
}
