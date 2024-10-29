import { loadError } from '$lib/server';
import { list } from '$lib/schema/people/imports';
import { parse } from '$lib/schema/valibot';

export async function load(event) {
	const result = await event.fetch('/api/v1/people/imports');
	if (!result.ok) return loadError(result);
	const parsed = parse(list, await result.json());
	return { imports: parsed };
}
