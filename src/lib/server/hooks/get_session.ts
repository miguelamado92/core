import { COOKIE_SESSION_NAME } from '$env/static/private';
import { read as readSession } from '$lib/server/api/core/sessions';
import { type RequestEvent } from '@sveltejs/kit';
export default async function (event: RequestEvent) {
	const code = event.cookies.get(COOKIE_SESSION_NAME);
	if (code) {
		try {
			const { admin, instance } = await readSession({ code, t: event.locals.t });
			return { admin, instance };
		} catch (err) {
			throw new Error('Invalid session cookie provided');
		}
	} else {
		throw new Error('No session cookie provided');
	}
}
