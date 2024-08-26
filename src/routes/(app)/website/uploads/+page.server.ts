import { loadError, filter } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/website/uploads';

export async function load(event) {
	const result = await event.fetch(filter(`/api/v1/website/uploads`, event.url));
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(schema.list, body);
	return { uploads: parsed };
}
