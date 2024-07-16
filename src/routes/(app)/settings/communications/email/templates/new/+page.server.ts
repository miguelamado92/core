import {
	loadError,
	valibot,
	superValidate,
	returnMessage,
	message,
	redirect,
	BelcodaError,
	type Infer
} from '$lib/server';
import { create } from '$lib/schema/communications/email/templates';
import { v } from '$lib/schema/valibot';

export async function load(event) {
	const form = await superValidate(valibot(create));
	return { form };
}

export const actions = {
	default: async function post(event) {
		const form = await superValidate<Infer<typeof create>, BelcodaError>(
			event.request,
			valibot(create)
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
		const response = await event.fetch(`/api/v1/communications/email/templates`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form.data)
		});
		if (!response.ok) return returnMessage(response, form);
		return redirect(event, {
			location: `/settings/communications/email/templates`,
			message: event.locals.t.forms.actions.created()
		});
	}
};
