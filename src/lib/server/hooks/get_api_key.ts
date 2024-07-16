import { API_KEY_HEADER } from '$env/static/private';
import { getApiKey } from '$lib/server/api/core/admins';
import { type RequestEvent } from '@sveltejs/kit';
export default async function (event: RequestEvent) {
	const key = event.request.headers.get(API_KEY_HEADER);
	if (key) {
		try {
			const { admin, instance } = await getApiKey({ api_key: key, t: event.locals.t });
			return { admin, instance };
		} catch (err) {
			throw new Error('Invalid API key provided');
		}
	} else {
		throw new Error('No API key provided');
	}
}
