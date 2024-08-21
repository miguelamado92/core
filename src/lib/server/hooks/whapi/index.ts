import type { MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';
type Resolve = (event: RequestEvent, opts?: ResolveOptions | undefined) => MaybePromise<Response>;
import type { HandlerResponse } from '$lib/server/hooks/handlers';

import { pino } from '$lib/server';
const log = pino('$lib/server/hooks/whatsapp');
export default async function (event: RequestEvent, resolve: Resolve): Promise<HandlerResponse> {
	log.info(`🌥️💜 ${event.request.method} ${event.url.href}`);
	const body = await event.request.json();
	log.info(body);
	return { continue: true, response: null };
}
