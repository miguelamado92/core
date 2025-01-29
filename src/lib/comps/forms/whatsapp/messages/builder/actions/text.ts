import { type Read } from '$lib/schema/communications/whatsapp/messages';
export function extractText(message: Read['message']): string {
	if (message.type === 'text') {
		return message.text.body;
	} else if (message.type === 'interactive') {
		return message.interactive.body.text;
	} else if (message.type === 'image') {
		return message.image.caption || '';
	} else {
		return '';
	}
}

export function setText(message: Read['message'], input: string): Read['message'] {
	if (message.type === 'text') {
		return {
			...message,
			text: {
				...message.text,
				body: input
			}
		};
	} else if (message.type === 'interactive') {
		return {
			...message,
			interactive: {
				...message.interactive,
				body: {
					...message.interactive.body,
					text: input
				}
			}
		};
	} else if (message.type === 'image') {
		return {
			...message,
			image: {
				...message.image,
				caption: input
			}
		};
	} else {
		return message;
	}
}
