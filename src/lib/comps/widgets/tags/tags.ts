import { list } from '$lib/schema/core/tags';
import { parse } from '$lib/schema/valibot';
export async function load() {
	const response = await fetch(`/api/v1/tags`);
	const body = await response.json();
	return parse(list, body).items;
}
