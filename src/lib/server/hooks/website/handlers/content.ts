import renderTemplate from '$lib/server/utils/handlebars/render';
import updatePerson from '$lib/server/hooks/website/utils/update_person';

import { readBySlug as readContentTypeBySlug } from '$lib/server/api/website/content_types';
import { readBySlug as readContentBySlug } from '$lib/server/api/website/content';
import { read as readTemplate } from '$lib/server/api/website/templates';

import {
	render,
	compile_custom_code,
	type RenderContext,
	type RenderStatus
} from '$lib/server/hooks/website/render';

import { pino } from '$lib/server';

const log = pino(import.meta.url);
const error404 = {
	title: 'Error',
	error_code: 'Error 404',
	error_message: 'Page not found'
};

export default async function ({
	content_slug,
	content_type_slug,
	code,
	method,
	instance,
	t
}: {
	content_type_slug: string | null | undefined;
	content_slug: string | null | undefined;
	code: string | null | undefined;
	method: 'GET' | 'POST';
	instance: App.Locals['instance'];
	t: App.Localization;
}): Promise<Response> {
	let status = { success: false, error: null };
	if (!content_slug) throw error404;
	if (!content_type_slug) throw error404;

	if (method === 'POST') {
		// TODO: Handle regular content POST method
	}

	const contentType = await readContentTypeBySlug({
		instanceId: instance.id,
		slug: content_type_slug,
		t: t
	}).catch((err) => {
		log.error('Error reading content type');
		log.error(err);
		throw error404;
	});

	const content = await readContentBySlug({
		instanceId: instance.id,
		slug: content_slug,
		contentTypeId: contentType.id,
		t: t
	}).catch((err) => {
		log.error('Error reading content');
		log.error(err);
		throw error404;
	});

	const template = await readTemplate({
		instanceId: instance.id,
		templateId: content.template_id,
		t: t
	}).catch((err) => {
		log.error('Error reading template');
		log.error(err);
		throw error404;
	});

	const output = await renderTemplate({
		instanceId: instance.id,
		template: template.html,
		context: { content: content },
		t
	});
	const custom_code = compile_custom_code(content, template);
	const final = render({
		template: template,
		renderedContent: output,
		context: { content: content, status },
		customCode: custom_code,
		metatags: content.html_metatags
	});

	return new Response(final, {
		status: 200,
		headers: {
			'Content-Type': 'text/html'
		}
	});
}
