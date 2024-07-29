import { valibot, superValidate, formAction, redirect } from '$lib/server';
import { create, read } from '$lib/schema/communications/whatsapp/threads';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const form = await superValidate(valibot(create));
	return { form };
}

export const actions = {
	default: async function (event) {
		const output = await formAction({
			url: '/api/v1/communications/whatsapp/threads',
			method: 'POST',
			event,
			inputSchema: create
		});
		if (output.error) return output.output;
		const parsed = parse(read, output.output);
		return redirect(event, {
			location: `/communications/whatsapp/${parsed.id}`,
			message: event.locals.t.forms.actions.success()
		});
	}
};
