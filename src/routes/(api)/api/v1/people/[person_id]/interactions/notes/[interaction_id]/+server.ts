import { json, error } from '$lib/server';
import { updateNotes } from '$lib/server/api/people/interactions';
import { updateNotes as updateNotesSchema } from '$lib/schema/people/interactions';
import { parse } from '$lib/schema/valibot';
export async function PUT(event) {
	const body = await event.request.json();
	const parsed = parse(updateNotesSchema, body);
	const newNote = await updateNotes({
		instanceId: event.locals.instance.id,
		personId: Number(event.params.person_id),
		interactionId: Number(event.params.interaction_id),
		notes: parsed.note,
		adminId: event.locals.admin.id,
		t: event.locals.t
	});
	return json(newNote);
}
