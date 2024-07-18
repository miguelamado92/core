import type { RequestEvent } from '@sveltejs/kit';

import { read as readTemplate } from '$lib/server/api/website/templates';
import renderHandlebarsTemplate from '$lib/server/utils/handlebars/render';
import {
	render,
	compile_custom_code,
	type RenderContext,
	type RenderStatus
} from '$lib/server/hooks/website/render';

import { pino } from '$lib/server';
const log = pino('/lib/server/hooks/website/handlers/event');
const error404 = {
	title: 'Error',
	error_code: 'Error 404',
	error_message: 'Page not found'
};

import { readBySlug as readEventBySlug } from '$lib/server/api/events/events';

import { eventSignup, signUpQueueMessage } from '$lib/schema/events/events';
import { parse } from '$lib/schema/valibot';

export default async function ({
	instance,
	content_slug,
	code,
	t,
	method,
	event
}: {
	content_slug: string | null | undefined;
	code: string | null | undefined;
	method: 'GET' | 'POST';
	instance: App.Locals['instance'];
	t: App.Localization;
	event: RequestEvent;
}): Promise<Response> {
	let status: RenderStatus = { success: false, error: null };
	if (!content_slug) throw error404;

	const eventObject = await readEventBySlug({
		instanceId: instance.id,
		slug: content_slug
	}).catch((err) => {
		log.error('Error reading event');
		log.error(err);
		throw error404;
	});
	const event_template = await readTemplate({
		instanceId: instance.id,
		templateId: eventObject.template_id,
		t: t
	}).catch((err) => {
		log.debug('Error reading petition template', err);
		throw error404;
	});

	if (method === 'POST') {
		try {
			const formBody = await event.request.formData();
			const body = Object.fromEntries(formBody);
			const parsed = parse(eventSignup, {
				...body,
				country: event.locals.instance.country,
				opt_in: Boolean(body.opt_in)
			});
			const queueMessage = parse(signUpQueueMessage, { event_id: eventObject.id, signup: parsed });
			await event.locals.queue(
				'events/registration',
				instance.id,
				queueMessage,
				instance.settings.default_admin_id
			);
			status.success = true;
		} catch (err) {
			if (err instanceof Error) {
				status.error = err.message;
			} else {
				status.error = event.locals.t.errors.generic();
			}
		}
	}

	const output = await renderHandlebarsTemplate({
		template: event_template.html,
		instanceId: instance.id,
		context: { event: eventObject, status }
	});

	const custom_code = compile_custom_code(eventObject, event_template);
	const final = render({
		context: { event: eventObject, status },
		renderedContent: output,
		customCode: custom_code,
		template: event_template,
		metatags: eventObject.html_metatags
	});

	return new Response(final, {
		status: 200,
		headers: {
			'Content-Type': 'text/html'
		}
	});
}
