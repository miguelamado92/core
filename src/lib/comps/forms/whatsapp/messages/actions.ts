import { type Read } from '$lib/schema/communications/whatsapp/messages';
import { type Message } from '$lib/schema/communications/whatsapp/elements/message';

export const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/500x250';

export async function updateMessage(message: Read): Promise<Read> {
	const res = await fetch('/api/v1/communications/whatsapp/messages/' + message.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message: message.message,
			actions: message.actions
		})
	});
	return await res.json();
}
export async function handleFileUpload(
	message: Read,
	url: string,
	fileName: string
): Promise<Read> {
	if (message.message.type === 'document') {
		message.message.document.link = url;
		message.message.document.filename = fileName;
	}
	if (message.message.type === 'image') {
		message.message.image.link = url;
	}
	const newMessage = await updateMessage(message);
	return newMessage;
}

export function addImageToMessage(message: Read): Read {
	if (message.message.type === 'text') {
		const imageMessage: Message = {
			type: 'image',
			image: {
				link: PLACEHOLDER_IMAGE_URL,
				caption: message.message.text.body
			}
		};
		message.message = imageMessage;
		return message;
	}
	if (message.message.type === 'interactive') {
		const newMessage: Message = {
			type: 'interactive',
			interactive: {
				header: {
					type: 'image',
					image: {
						link: PLACEHOLDER_IMAGE_URL
					}
				},
				...message.message.interactive
			}
		};
	}
	return message;
}

export function removeImageFromMessage(message: Read): Read {
	if (message.message.type === 'interactive') {
		delete message.message.interactive.header;
		return message;
	} else {
		const caption =
			message.message.type === 'image'
				? message.message.image.caption || '[message_body]'
				: '[message_body]';
		const textMessage: Message = {
			type: 'text',
			text: {
				body: caption,
				preview_url: true
			}
		};
		message.message = textMessage;
	}
	return message;
}

export function convertToTextMessage(message: Read): Read {
	if (message.message.type === 'document') {
		const textMessage: Message = {
			type: 'text',
			text: {
				body: message.message.document.caption || '[message]',
				preview_url: true
			}
		};
		message.message = textMessage;
		return message;
	} else {
		const textMessage: Message = {
			type: 'text',
			text: {
				body: '[message]',
				preview_url: true
			}
		};
		message.message = textMessage;
		return message;
	}
}
import { v4 as uuidv4 } from 'uuid';

import type { Action } from '$lib/schema/communications/whatsapp/elements/interactive';

export function removeButtonFromMessage(message: Read, buttonIndex: number): Read {
	//this is gonna be tricky because we need to remove the button from the message and the actions
	if (message.message.type === 'interactive') {
		//this should ALWAYS be true if we're removing a button, but let's check anyway
		const button = message.message.interactive.action.buttons[buttonIndex];
		message.message.interactive.action.buttons.splice(buttonIndex, 1);
		delete message.actions[button.id]; //button.id is the uuid which references the action...

		//now, if it's the last button, we need to convert it to a text or image, depending on what we have lol...

		if (message.message.interactive.action.buttons.length === 0) {
			if (message.message.interactive.header?.type === 'image') {
				const newMessage: Message = {
					type: 'image',
					image: {
						link: message.message.interactive.header.image.link || PLACEHOLDER_IMAGE_URL,
						caption: message.message.interactive.body.text || '[message_body]'
					}
				};
				message.message = newMessage;
			} else {
				const newMessage: Message = {
					type: 'text',
					text: {
						body: message.message.interactive.body.text,
						preview_url: true
					}
				};
				message.message = newMessage;
			}
		}
		return message;
	}
	return message;
}

export function addButtonToMessage(message: Read): Read {
	const uuid = uuidv4();
	const button: Action['buttons'][number] = {
		type: 'reply',
		title: '[button]',
		id: uuid
	};
	if (message.message.type === 'text') {
		const newMessage: Message = {
			type: 'interactive',
			interactive: {
				action: {
					buttons: [button]
				},
				type: 'button',
				body: {
					text: message.message.text.body
				}
			}
		};
		message.message = newMessage;
		message.actions = { ...message.actions, [uuid]: [] };
		return message;
	}
	if (message.message.type === 'image') {
		const newMessage: Message = {
			type: 'interactive',
			interactive: {
				action: {
					buttons: [button]
				},
				type: 'button',
				header: {
					type: 'image',
					image: {
						link: message.message.image.link || PLACEHOLDER_IMAGE_URL,
						caption: message.message.image.caption || undefined
					}
				},
				body: {
					text: message.message.image.caption || '[message_body]'
				}
			}
		};
		message.message = newMessage;
		message.actions = { ...message.actions, [uuid]: [] };
		return message;
	}
	if (message.message.type === 'interactive') {
		message.message.interactive.action.buttons.push(button);
		message.actions = { ...message.actions, [uuid]: [] };
		return message;
	}
	return message;
}

import type { ActionArray } from '$lib/schema/communications/actions/actions';

export function setActionInMessage(
	actionId: string,
	action: ActionArray[number],
	message: Read
): Read {
	if (Array.isArray(message.actions[actionId])) {
		const existingTypeIndex = message.actions[actionId].findIndex((a) => a.type === action.type);
		if (existingTypeIndex !== -1) {
			//we've already got this action type for this action, so let's replace it
			message.actions[actionId][existingTypeIndex] = action;
		} else {
			//no existing action of this type, let's add
			message.actions[actionId].push(action);
		}
	}
	return message;
}

export function removeActionInMessage(actionId: string, actionIndex: number, message: Read): Read {
	if (Array.isArray(message.actions[actionId])) {
		message.actions[actionId].splice(actionIndex, 1);
	}
	return message;
}

export async function setNextMessage(
	messageId: string,
	nextMessageId: string | null
): Promise<Read> {
	const res = await fetch('/api/v1/communications/whatsapp/messages/' + messageId, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			next: nextMessageId
		})
	});
	return await res.json();
}
