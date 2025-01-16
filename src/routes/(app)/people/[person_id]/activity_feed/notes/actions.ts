import { sanitizeHTML } from '$lib/utils/text/string';
import { read, type Read } from '$lib/schema/people/interactions';
import { parse } from '$lib/schema/valibot';
export async function updateNotes({
	interactionId,
	personId,
	updatedNotes
}: {
	interactionId: number;
	personId: number;
	updatedNotes: string;
}): Promise<Read> {
	const result = await fetch(`/api/v1/people/${personId}/interactions/notes/${interactionId}`, {
		method: 'PUT',
		body: JSON.stringify({ note: sanitizeHTML(updatedNotes) })
	});
	if (!result.ok) {
		const error = await result.json();
		throw new Error('Failed to update notes');
	}
	const json = await result.json();
	const parsed = parse(read, json);
	return parsed;
}
