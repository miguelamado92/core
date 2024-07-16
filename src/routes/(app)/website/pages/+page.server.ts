import { loadError, filter } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/website/content';

export async function load(event) {
	const response = await event.fetch(
		filter(
			`/api/v1/website/content_types/${event.locals.instance.settings.website.pages_content_type_id}/content`,
			event.url
		)
	);
	if (!response.ok) {
		return loadError(response);
	}
	const body = await response.json();
	const parsed = parse(schema.list, body);
	return { pages: parsed };
}
