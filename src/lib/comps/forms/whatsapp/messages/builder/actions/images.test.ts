import { describe, it, expect } from 'vitest';
import {
	removeImage,
	extractImageUrl,
	setImageUrl
} from '$lib/comps/forms/whatsapp/messages/builder/actions/images';

describe('removeImage', () => {
	it('should convert an image message to a text message with its caption', () => {
		const message = {
			type: 'image' as 'image',
			image: { link: 'https://example.com/image.jpg', caption: 'Hello' }
		};
		expect(removeImage(message)).toEqual({
			type: 'text',
			text: { body: 'Hello', preview_url: true }
		});
	});

	it('should convert an image message to a text message with an empty caption if none exists', () => {
		const message = { type: 'image' as 'image', image: { link: 'https://example.com/image.jpg' } };
		expect(removeImage(message)).toEqual({
			type: 'text',
			text: { body: '', preview_url: true }
		});
	});

	it('should remove the image from an interactive message while keeping the rest unchanged', () => {
		const message = {
			type: 'interactive' as 'interactive',
			interactive: {
				header: { type: 'image' as 'image', image: { link: 'https://example.com/image.jpg' } },
				body: { text: 'Hello' },
				type: 'button' as 'button',
				action: { buttons: [] }
			}
		};

		expect(removeImage(message)).toEqual({
			type: 'interactive',
			interactive: {
				type: 'button',
				body: { text: 'Hello' },
				action: { buttons: [] }
			}
		});
	});

	it('should return the message unchanged if it is not an image or interactive message', () => {
		const message = { type: 'text' as 'text', text: { body: 'Hello', preview_url: false } };
		expect(removeImage(message)).toBe(message);
	});
});

describe('extractImageUrl', () => {
	it('should return the image URL from an image message', () => {
		const message = { type: 'image' as 'image', image: { link: 'https://example.com/image.jpg' } };
		expect(extractImageUrl(message)).toBe('https://example.com/image.jpg');
	});

	it('should return the image URL from an interactive message with an image header', () => {
		const message = {
			type: 'interactive' as 'interactive',
			interactive: {
				action: { buttons: [] },
				type: 'button' as 'button',
				body: { text: 'Hello' },
				header: { type: 'image' as 'image', image: { link: 'https://example.com/image.jpg' } }
			}
		};
		expect(extractImageUrl(message)).toBe('https://example.com/image.jpg');
	});

	it('should return null for an interactive message without an image header', () => {
		const message = {
			type: 'interactive' as 'interactive',
			interactive: { type: 'button' as 'button', action: { buttons: [] }, body: { text: 'Hello' } }
		};
		expect(extractImageUrl(message)).toBeNull();
	});

	it('should return null for a non-image message', () => {
		const message = { type: 'text' as 'text', text: { body: 'Hello', preview_url: false } };
		expect(extractImageUrl(message)).toBeNull();
	});
});

describe('setImageUrl', () => {
	it('should update the image URL in an image message', () => {
		const message = { type: 'image' as 'image', image: { link: 'old.jpg', caption: 'Caption' } };
		expect(setImageUrl(message, 'new.jpg')).toEqual({
			type: 'image',
			image: { link: 'new.jpg', caption: 'Caption' }
		});
	});

	it('should set an image URL in an interactive message', () => {
		const message = {
			type: 'interactive' as 'interactive',
			interactive: { body: { text: 'Hello' }, type: 'button' as 'button', action: { buttons: [] } }
		};
		expect(setImageUrl(message, 'new.jpg')).toEqual({
			type: 'interactive' as 'interactive',
			interactive: {
				body: { text: 'Hello' },
				type: 'button' as 'button',
				action: { buttons: [] },
				header: {
					type: 'image',
					image: { link: 'new.jpg' }
				}
			}
		});
	});

	it('should convert a text message to an image message while preserving the text as a caption', () => {
		const message = { type: 'text' as 'text', text: { body: 'Hello', preview_url: false } };
		expect(setImageUrl(message, 'new.jpg')).toEqual({
			type: 'image',
			image: { caption: 'Hello', link: 'new.jpg' }
		});
	});

	it('should return the message unchanged if it is not an image, text, or interactive message', () => {
		const message = { type: 'video' as 'video', video: { link: 'video.mp4' } };
		expect(setImageUrl(message, 'new.jpg')).toBe(message);
	});
});
