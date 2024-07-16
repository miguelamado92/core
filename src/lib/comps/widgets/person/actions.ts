import { type _ListWithSearch, _listWithSearch } from '$lib/schema/people/people';
import { parse } from '$lib/schema/valibot';
export async function load(search: string | null | undefined): Promise<_ListWithSearch['items']> {
	const url = search
		? `/api/v1/people?search=${search}&_withSearch=true`
		: '/api/v1/people?_withSearch=true';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to load people: ${response.statusText}`);
	}
	const body = await response.json();
	const parsed = parse(_listWithSearch, body);
	return parsed.items;
}
