import { loadError, filter } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/events/events';

export async function load(event) {
	const response = await event.fetch(filter('/api/v1/events', event.url));
	if (!response.ok) {
		return loadError(response);
	}
	const body = await response.json();
	const parsed = parse(schema.list, body);
	return { events: parsed };
}
