import { describe, expect, it } from 'vitest';

import { create as createSchema, type Read } from '$lib/schema/people/interactions';

import { parse } from '$lib/schema/valibot';

import { moveNoteToEditHistory } from '$lib/server/api/people/interactions';

import { Localization } from '$lib/i18n';
const t = new Localization('en');

function parseNotesSchema(body: Read['details']) {
	return parse(createSchema.entries.details, body);
}

describe('Updating the notes that have been recorded on a person record', () => {
	const noteWithNoHistory: Read['details'] = {
		type: 'notes',
		notes: 'This is a note',
		edit_history: []
	};

	const noteWithHistory: Read['details'] = {
		type: 'notes',
		notes: 'This is a note',
		edit_history: [
			{
				edited_by: 1,
				prior_state: 'Thi i a note',
				edited_at: new Date()
			}
		]
	};

	it('Should update the note and move the old note to the edit history', async () => {
		const newNote = 'This is a new note';
		const newObject = moveNoteToEditHistory({
			newNote,
			adminId: 1,
			previousNote: noteWithNoHistory,
			t
		});
		expect(parseNotesSchema(newObject)).toBeTruthy();
		expect(newObject.notes).toBe(newNote);
		expect(newObject.edit_history.length).toBe(1);
		expect(newObject.edit_history[0].prior_state).toBe(noteWithNoHistory.notes);
	});

	it('Should update a note with existing edit history and create a new entry at the end of the edit history array', async () => {
		const newNote = 'This is a new new note';
		const newObject = moveNoteToEditHistory({
			newNote,
			adminId: 1,
			previousNote: noteWithHistory,
			t
		});
		expect(parseNotesSchema(newObject)).toBeTruthy();
		expect(newObject.notes).toBe(newNote);
		expect(newObject.edit_history.length).toBe(2);
		expect(newObject.edit_history[0].prior_state).not.toBe(noteWithHistory.notes);
		expect(newObject.edit_history[1].prior_state).toBe(noteWithHistory.notes);
	});

	it('Should throw an error when the previous note is not of type notes', async () => {
		expect(() =>
			moveNoteToEditHistory({
				newNote: 'This is a new note',
				adminId: 1,
				previousNote: { type: 'attended_event', event_id: 1, event_name: 'Test Event' },
				t
			})
		).toThrowError();
	});
});
