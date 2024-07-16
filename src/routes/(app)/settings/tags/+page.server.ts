import { loadError, filter } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/core/tags';

export async function load(event) {
	const response = await event.fetch(filter('/api/v1/tags', event.url));
	if (!response.ok) {
		return loadError(response);
	}
	const body = await response.json();
	const parsed = parse(schema.list, body);
	return { tags: parsed };
}
