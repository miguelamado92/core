export function countTextTemplatePlaceholders(input: string): number {
	const regex = /{{(\d+)}}/g;
	const matches = new Set<string>();
	let match;

	while ((match = regex.exec(input)) !== null) {
		matches.add(match[1]);
	}

	return matches.size;
}

import {
	type List as ListMessages,
	list as listMessage
} from '$lib/schema/communications/whatsapp/messages';
import { parse } from '$lib/schema/valibot';
export async function returnMessagesInThread(threadId: number): Promise<ListMessages> {
	const result = await fetch(`/api/v1/communications/whatsapp/threads/${threadId}/messages`);
	if (!result.ok) throw new Error('Failed to fetch messages');
	const parsed = parse(listMessage, await result.json());
	return parsed;
}
