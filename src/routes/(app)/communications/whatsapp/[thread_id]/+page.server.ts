import { filter, valibot, superValidate, loadError, formAction, redirect } from '$lib/server';
import { fail } from '@sveltejs/kit';
import { create, read } from '$lib/schema/communications/whatsapp/threads';
import { read as readMessage } from '$lib/schema/communications/whatsapp/messages';
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

	const messageResult = await event.fetch(
		`/api/v1/communications/whatsapp/messages/${threadParsed.template_message_id}`
	);
	if (!messageResult.ok) return loadError(messageResult);
	const messageBody = await messageResult.json();
	const messageParsed = parse(readMessage, messageBody);

	return {
		templates: parsed,
		templateMessage: messageParsed,
		thread: threadParsed,
		pageTitle: [{ key: 'THREADNAME', title: threadParsed.name }]
	};
}
