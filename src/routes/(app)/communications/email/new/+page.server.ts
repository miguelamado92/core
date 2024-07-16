import { formAction, valibot, superValidate, redirect } from '$lib/server';
import { create, read } from '$lib/schema/communications/email/sends';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const form = await superValidate(valibot(create));
	return { form };
}

export const actions = {
	default: async function (event) {
		const result = await formAction({
			method: 'POST',
			url: '/api/v1/communications/email/sends',
			event,
			inputSchema: create
		});
		if (result.error) {
			return result.output;
		}

		const parsed = parse(read, result.output);
		return redirect(event, {
			location: `/communications/email/${parsed.id}`,
			message: event.locals.t.forms.actions.created()
		});
	}
};
