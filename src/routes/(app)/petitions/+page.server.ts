import { loadError, filter } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/petitions/petitions';

export async function load(event) {
	const response = await event.fetch(filter('/api/v1/petitions', event.url));
	if (!response.ok) {
		return loadError(response);
	}
	const body = await response.json();
	const parsed = parse(schema.list, body);
	return { petitions: parsed };
}
