import { loadError, filter } from '$lib/server';
import { list as schema } from '$lib/schema/core/admin';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const response = await event.fetch(filter('/api/v1/admins', event.url));
	if (!response.ok) return loadError(response);
	const list = await response.json();
	const parsed = parse(schema, list);
	return {
		admins: parsed
	};
}
