import { filter, loadError } from '$lib/server';
import { list } from '$lib/schema/communications/email/sends';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const result = await event.fetch(filter(`/api/v1/communications/email/sends`, event.url));
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(list, body);
	return { sends: parsed };
}
