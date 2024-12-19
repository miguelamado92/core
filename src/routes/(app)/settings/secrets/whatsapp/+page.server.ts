import { loadError, filter, superValidate, valibot } from '$lib/server';
// import { list as schema } from '$lib/schema/core/instance';
// import { parse } from '$lib/schema/valibot';
import { secrets } from '$lib/schema/core/instance';
export async function load(event) {
	const response = await event.fetch(filter('/api/v1/admins', event.url));
	if (!response.ok) return loadError(response);
	// const list = await response.json();
	// const parsed = parse(schema);
	const form = await superValidate(valibot(secrets));
	return {
		form
	};
}
