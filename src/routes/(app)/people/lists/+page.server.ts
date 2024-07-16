import { loadError } from '$lib/server';
import { list } from '$lib/schema/people/lists';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const result = await event.fetch(`/api/v1/people/lists`);
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(list, body);
	return { lists: parsed };
}
