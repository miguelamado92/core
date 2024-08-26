import { filter, loadError } from '$lib/server';
import { read } from '$lib/schema/people/groups';
import { parse } from '$lib/schema/valibot';
import { list } from '$lib/schema/communications/whatsapp/received_whatsapp_group_messages';
export async function load(event) {
	const response = await event.fetch(
		filter(`/api/v1/people/groups/${event.params.group_id}`, event.url)
	);
	if (!response.ok) return loadError(response);
	const body = await response.json();
	const parsed = parse(read, body);

	const messages = await event.fetch(
		filter(`/api/v1/people/groups/${event.params.group_id}/whatsapp/messages`, event.url)
	);
	if (!messages.ok) return loadError(messages);
	const messagesBody = await messages.json();
	const messagesParsed = parse(list, messagesBody);

	return {
		group: parsed,
		messages: messagesParsed,
		pageTitle: [{ key: 'GROUPNAME', title: parsed.name }]
	};
}
