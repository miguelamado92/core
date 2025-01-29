import { type Read } from '$lib/schema/communications/whatsapp/messages';

export function createWhatsAppMessageAction(id: string, actions: Read['actions']): Read['actions'] {
	if (Array.isArray(actions[id])) {
		// This is the new action that we are adding to the actions array
		let newActions = actions;
		newActions[id] = newActions[id].concat([
			{
				type: 'send_whatsapp_message',
				message_id: ''
			}
		]);
		return newActions;
	} else {
		// If there are no actions in the actions array, we create a new array with the new action
		let newActions = actions;
		newActions[id] = [
			{
				type: 'send_whatsapp_message',
				message_id: ''
			}
		];
		return newActions;
	}
}

export function createEventRegistrationAction(
	id: string,
	actions: Read['actions']
): Read['actions'] {
	if (Array.isArray(actions[id])) {
		// This is the new action that we are adding to the actions array
		let newActions = actions;
		newActions[id] = newActions[id].concat([
			{
				type: 'register_for_event',
				event_id: 0
			}
		]);
		return newActions;
	} else {
		// If there are no actions in the actions array, we create a new array with the new action
		let newActions = actions;
		newActions[id] = [
			{
				type: 'register_for_event',
				event_id: 0
			}
		];
		return newActions;
	}
}
export function updateEventRegistrationAction(
	action: Read['actions'][string][number],
	eventId: number
): Read['actions'][string][number] {
	if (action.type === 'register_for_event') {
		return {
			...action,
			event_id: eventId
		};
	} else {
		return action;
	}
}
