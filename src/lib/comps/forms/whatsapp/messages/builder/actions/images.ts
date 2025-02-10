import { type Read } from '$lib/schema/communications/whatsapp/messages';
export function removeImage(message: Read['message']): Read['message'] {
	if (message.type === 'image') {
		//convert into a text message
		return {
			type: 'text',
			text: {
				body: message.image.caption || '',
				preview_url: true
			}
		};
	} else if (message.type === 'interactive') {
		//remove the image and keep the rest the same
		const { header, ...newInteractive } = message.interactive; //strips out the header (image is always on the header)
		return {
			type: 'interactive',
			interactive: newInteractive
		};
	} else {
		//don't change anything
		return message;
	}
}

export function extractImageUrl(message: Read['message']): string | null {
	if (message.type === 'image') {
		return message.image.link;
	} else if (message.type === 'interactive' && 'header' in message.interactive) {
		if (message.interactive.header && message.interactive.header.type === 'image') {
			return message.interactive.header.image.link;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export function setImageUrl(message: Read['message'], url: string): Read['message'] {
	if (message.type === 'image') {
		return {
			...message,
			image: {
				...message.image,
				link: url
			}
		};
	} else if (message.type === 'interactive') {
		// we need to set the image in the header
		return {
			...message,
			interactive: {
				...message.interactive,
				header: {
					...message.interactive.header,
					type: 'image',
					image: {
						link: url
					}
				}
			}
		};
	} else if (message.type === 'text') {
		// need to convert type to image and try to preserve any text
		return {
			type: 'image',
			image: {
				caption: message.text.body,
				link: url
			}
		};
	} else {
		return message;
	}
}
