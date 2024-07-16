import { loadError, filter } from '$lib/server';
import { list } from '$lib/schema/website/blocks';
import { v } from '$lib/schema/valibot';

export async function load(event) {
	const response = await event.fetch(filter('/api/v1/website/blocks', event.url));
	if (!response.ok) {
		return loadError(response);
	}
	const blocks = await response.json();
	const parsed = v.parse(list, blocks);
	return { blocks: parsed };
}
