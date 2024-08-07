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

import { readBySlug as readPetitionBySlug } from '$lib/server/api/petitions/petitions';

import { petitionSignature, signatureQueueMessage } from '$lib/schema/petitions/petitions';
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

	const petitionObject = await readPetitionBySlug({
		instanceId: instance.id,
		slug: content_slug
	}).catch((err) => {
		log.error('Error reading petition');
		log.error(err);
		throw error404;
	});
	const petitionTemplate = await readTemplate({
		instanceId: instance.id,
		templateId: petitionObject.template_id,
		t: t
	}).catch((err) => {
		log.debug('Error reading petition template', err);
		throw error404;
	});

	if (method === 'POST') {
		try {
			const formBody = await event.request.formData();
			const body = Object.fromEntries(formBody);
			const parsed = parse(petitionSignature, {
				...body,
				country: event.locals.instance.country,
				opt_in: Boolean(body.opt_in)
			});
			const queueMessage = parse(signatureQueueMessage, {
				petition_id: petitionObject.id,
				signup: parsed
			});
			await event.locals.queue(
				'petitions/signature',
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
		template: petitionTemplate.html,
		instanceId: instance.id,
		context: { petition: petitionObject, status },
		t
	});

	const custom_code = compile_custom_code(petitionObject, petitionTemplate);
	const final = render({
		context: { petition: petitionObject, status },
		renderedContent: output,
		customCode: custom_code,
		template: petitionTemplate,
		metatags: petitionObject.html_metatags
	});

	return new Response(final, {
		status: 200,
		headers: {
			'Content-Type': 'text/html'
		}
	});
}
