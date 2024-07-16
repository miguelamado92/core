import { loadError, filter } from '$lib/server';
import { list } from '$lib/schema/communications/email/templates';
import { v } from '$lib/schema/valibot';

export async function load(event) {
	const response = await event.fetch(filter('/api/v1/communications/email/templates', event.url));
	if (!response.ok) {
		return loadError(response);
	}
	const templates = await response.json();
	const parsed = v.parse(list, templates);
	return { templates: parsed };
}
