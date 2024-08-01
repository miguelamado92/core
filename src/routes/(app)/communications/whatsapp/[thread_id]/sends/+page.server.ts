import { filter, valibot, superValidate, loadError, formAction, redirect } from '$lib/server';
import { read } from '$lib/schema/communications/whatsapp/threads';
import { list, create } from '$lib/schema/communications/whatsapp/sends';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const result = await event.fetch(
		filter(`/api/v1/communications/whatsapp/threads/${event.params.thread_id}/sends`, event.url)
	);
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(list, body);

	const form = await superValidate(valibot(create));

	const threadResult = await event.fetch(
		`/api/v1/communications/whatsapp/threads/${event.params.thread_id}`
	);
	if (!threadResult.ok) return loadError(threadResult);
	const threadBody = await threadResult.json();
	const threadParsed = parse(read, threadBody);
	return {
		thread: threadParsed,
		sends: parsed,
		form: form,
		pageTitle: [{ key: 'THREADNAME', title: threadParsed.name }]
	};
}

export const actions = {
	default: async function (event) {
		const output = await formAction({
			event,
			inputSchema: create,
			method: 'POST',
			url: `/api/v1/communications/whatsapp/threads/${event.params.thread_id}/sends`
		});
		if (output.error) return output.output;
		return redirect(event, {
			location: `/communications/whatsapp/${event.params.thread_id}/sends`,
			message: event.locals.t.forms.actions.success()
		});
	}
};
