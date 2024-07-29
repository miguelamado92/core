import { filter, loadError } from '$lib/server';
import { list } from '$lib/schema/communications/whatsapp/threads';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const result = await event.fetch(filter(`/api/v1/communications/whatsapp/threads`, event.url));
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(list, body);
	return { threads: parsed };
}
