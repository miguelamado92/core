import {
	loadError,
	valibot,
	superValidate,
	returnMessage,
	message,
	redirect,
	BelcodaError,
	pino,
	type Infer
} from '$lib/server';
import { update, read } from '$lib/schema/website/templates';
import { v } from '$lib/schema/valibot';

const log = pino('(app)/settings/website/templates/[template_id]/+page.server.ts');

export async function load(event) {
	const response = await event.fetch(`/api/v1/website/templates/${event.params.template_id}`);
	if (!response.ok) {
		return loadError(response);
	}
	const template = await response.json();
	const parsed = v.parse(read, template);
	const form = await superValidate(parsed, valibot(update));
	return { template: parsed, form };
}

export const actions = {
	default: async function post(event) {
		const form = await superValidate<Infer<typeof update>, BelcodaError>(
			event.request,
			valibot(update)
		);
		if (!form.valid) {
			return message(
				form,
				new BelcodaError(400, 'VALIDATION', event.locals.t.errors.validation()),
				{
					status: 400
				}
			);
		}
		const response = await event.fetch(`/api/v1/website/templates/${event.params.template_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form.data)
		});
		if (!response.ok) {
			return returnMessage(response, form);
		}
		return redirect(event, {
			location: `/settings/website/templates`,
			message: event.locals.t.forms.actions.updated()
		});
	}
};
