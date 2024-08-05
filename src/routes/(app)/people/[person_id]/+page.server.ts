import { loadError } from '$lib/server';
import { read } from '$lib/schema/people/people';
import { parse } from '$lib/schema/valibot';

export async function load(event) {
	const result = await event.fetch(`/api/v1/people/${event.params.person_id}`);
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(read, body);
	return { person: parsed, pageTitle: [{ key: 'PERSONNAME', title: parsed.full_name }] };
}
