import type { RequestEvent } from '@sveltejs/kit';
import type { HandlerResponse } from '$lib/server/hooks/handlers';

export function handleApiFaviconRequest(event: RequestEvent): HandlerResponse {
	if (event.url.pathname.startsWith('/api/v1')) {
		if (event.url.pathname.includes('favicon.ico')) {
			return {
				continue: false,
				response: new Response(null, {
					status: 204
				})
			};
		}
	}
	return {
		continue: true,
		response: null
	};
}
