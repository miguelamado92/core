import { filter, valibot, superValidate, loadError, formAction, redirect } from '$lib/server';
import { fail } from '@sveltejs/kit';
import { create, read } from '$lib/schema/communications/whatsapp/threads';
import { list } from '$lib/schema/communications/whatsapp/template';
import { parse } from '$lib/schema/valibot';
export async function load(event) {
	const result = await event.fetch(filter(`/api/v1/communications/whatsapp/templates`, event.url));
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(list, body);

	const threadResult = await event.fetch(
		`/api/v1/communications/whatsapp/threads/${event.params.thread_id}`
	);
	if (!threadResult.ok) return loadError(threadResult);
	const threadBody = await threadResult.json();
	const threadParsed = parse(read, threadBody);
	return {
		actions: { ...threadParsed.actions }, //this is because I hit on a weird hydration bug where the actions object was being mutated by the formAction function somehow... shallow cloning the actions object fixed it.
		templates: parsed,
		thread: threadParsed,
		pageTitle: [{ key: 'THREADNAME', title: threadParsed.name }]
	};
}
