import { formAction, valibot, superValidate, redirect } from '$lib/server';
import { create, read } from '$lib/schema/people/lists';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const form = await superValidate(valibot(create));
	return { form };
}

export const actions = {
	default: async function (event) {
		const result = await formAction({
			method: 'POST',
			url: '/api/v1/people/lists',
			event,
			inputSchema: create
		});
		if (result.error) {
			return result.output;
		}

		const parsed = parse(read, result.output);
		return redirect(event, {
			location: `/people/lists/${parsed.id}`,
			message: event.locals.t.forms.actions.created()
		});
	}
};
