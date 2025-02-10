import { describe, it, expect } from 'vitest';
import * as actionsFunctions from '$lib/comps/forms/whatsapp/messages/builder/actions/actions';

describe('createWhatsAppMessageAction', () => {
	const buttonId = '9f4d2b16-3a72-4bfb-bc6e-d6fbcbb6c582';
	const alternativeButtonId = 'c3a1f9d7-5b8e-4e1b-92f5-8a2d7c3e64f1';
	const messageId = '3f4e3c27-3a72-32fd-ed2e-fffbffe6c432'; //random uuid

	it('should append a new action when an array exists', () => {
		const actions = {
			[buttonId]: [
				{
					type: 'send_whatsapp_message' as 'send_whatsapp_message',
					message_id: messageId
				}
			]
		};
		const result = actionsFunctions.createWhatsAppMessageAction(buttonId, actions);
		expect(result[buttonId]).toHaveLength(2);
		expect(result[buttonId][0]).toEqual({
			type: 'send_whatsapp_message',
			message_id: messageId
		});
		expect(result[buttonId][1]).toEqual({
			type: 'send_whatsapp_message',
			message_id: ''
		});
	});

	it('should append a new buttonId if there is an existing buttonId with actions', () => {
		const actions = {
			[buttonId]: [
				{
					type: 'send_whatsapp_message' as 'send_whatsapp_message',
					message_id: messageId
				}
			]
		};
		const result = actionsFunctions.createWhatsAppMessageAction(alternativeButtonId, actions);
		expect(result[buttonId]).toHaveLength(1);
		expect(result[buttonId][0]).toEqual({
			type: 'send_whatsapp_message',
			message_id: messageId
		});
		expect(result[alternativeButtonId]).toHaveLength(1);
		expect(result[alternativeButtonId][0]).toEqual({
			type: 'send_whatsapp_message',
			message_id: ''
		});
	});

	it('should create a new array if id does not exist', () => {
		const actions = {};
		const result = actionsFunctions.createWhatsAppMessageAction(buttonId, actions);
		expect(result[buttonId]).toHaveLength(1);
		expect(result[buttonId][0]).toEqual({
			type: 'send_whatsapp_message',
			message_id: ''
		});
	});

	it('should not mutate the original actions object', () => {
		const actions = {
			[buttonId]: [
				{
					type: 'send_whatsapp_message' as 'send_whatsapp_message',
					message_id: messageId
				}
			]
		};
		const copy = structuredClone(actions); // Deep copy for comparison

		actionsFunctions.createWhatsAppMessageAction(buttonId, actions);

		expect(actions).toEqual(copy); // Ensure original object is unchanged
	});

	it('should handle an existing id with a non-array value gracefully', () => {
		const actions = { [buttonId]: null as any }; // Simulating unexpected value
		const result = actionsFunctions.createWhatsAppMessageAction(buttonId, actions);
		expect(result[buttonId]).toEqual([{ type: 'send_whatsapp_message', message_id: '' }]);
	});

	it('should not modify other ids in the actions object', () => {
		const actions = {
			[buttonId]: [],
			[alternativeButtonId]: [
				{ type: 'send_whatsapp_message' as 'send_whatsapp_message', message_id: messageId }
			]
		};
		const result = actionsFunctions.createWhatsAppMessageAction(buttonId, actions);

		expect(result[alternativeButtonId]).toEqual(actions[alternativeButtonId]); // Ensure user2's actions remain unchanged
	});
});

describe('createEventRegistrationAction', () => {
	const buttonId = '9f4d2b16-3a72-4bfb-bc6e-d6fbcbb6c582';
	const alternativeButtonId = 'c3a1f9d7-5b8e-4e1b-92f5-8a2d7c3e64f1';
	const eventId = 1234;

	it('should append a new action when an array exists', () => {
		const actions = {
			[buttonId]: [
				{
					type: 'register_for_event' as 'register_for_event',
					event_id: eventId
				}
			]
		};
		const result = actionsFunctions.createEventRegistrationAction(buttonId, actions);
		expect(result[buttonId]).toHaveLength(2);
		expect(result[buttonId][0]).toEqual({
			type: 'register_for_event',
			event_id: eventId
		});
		expect(result[buttonId][1]).toEqual({
			type: 'register_for_event',
			event_id: 0
		});
	});

	it('should append a new buttonId if there is an existing buttonId with actions', () => {
		const actions = {
			[buttonId]: [
				{
					type: 'register_for_event' as 'register_for_event',
					event_id: eventId
				}
			]
		};
		const result = actionsFunctions.createEventRegistrationAction(alternativeButtonId, actions);
		expect(result[buttonId]).toHaveLength(1);
		expect(result[buttonId][0]).toEqual({
			type: 'register_for_event',
			event_id: eventId
		});
		expect(result[alternativeButtonId]).toHaveLength(1);
		expect(result[alternativeButtonId][0]).toEqual({
			type: 'register_for_event',
			event_id: 0
		});
	});

	it('should create a new array if id does not exist', () => {
		const actions = {};
		const result = actionsFunctions.createEventRegistrationAction(buttonId, actions);
		expect(result[buttonId]).toHaveLength(1);
		expect(result[buttonId][0]).toEqual({
			type: 'register_for_event',
			event_id: 0
		});
	});

	it('should not mutate the original actions object', () => {
		const actions = {
			[buttonId]: [
				{
					type: 'register_for_event' as 'register_for_event',
					event_id: eventId
				}
			]
		};
		const copy = structuredClone(actions); // Deep copy for comparison

		actionsFunctions.createEventRegistrationAction(buttonId, actions);

		expect(actions).toEqual(copy); // Ensure original object is unchanged
	});

	it('should handle an existing id with a non-array value gracefully', () => {
		const actions = { [buttonId]: null as any }; // Simulating unexpected value
		const result = actionsFunctions.createEventRegistrationAction(buttonId, actions);
		expect(result[buttonId]).toEqual([{ type: 'register_for_event', event_id: 0 }]);
	});

	it('should not modify other ids in the actions object', () => {
		const actions = {
			[buttonId]: [],
			[alternativeButtonId]: [
				{ type: 'register_for_event' as 'register_for_event', event_id: eventId }
			]
		};
		const result = actionsFunctions.createEventRegistrationAction(buttonId, actions);

		expect(result[alternativeButtonId]).toEqual(actions[alternativeButtonId]); // Ensure user2's actions remain unchanged
	});
});

describe('updateEventRegistrationAction', () => {
	it('should update event_id if action type is "register_for_event"', () => {
		const action = { type: 'register_for_event' as 'register_for_event', event_id: 1 };
		const updatedAction = actionsFunctions.updateEventRegistrationAction(action, 42);

		expect(updatedAction).toEqual({ ...action, event_id: 42 });
	});

	it('should return the original action if type is not "register_for_event"', () => {
		const action = {
			type: 'send_whatsapp_message' as 'send_whatsapp_message',
			message_id: 'randomUUID',
			otherProp: 'test'
		};
		const updatedAction = actionsFunctions.updateEventRegistrationAction(action, 42);

		expect(updatedAction).toBe(action);
	});
});
