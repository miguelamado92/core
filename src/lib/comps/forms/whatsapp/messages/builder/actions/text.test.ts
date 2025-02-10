import { describe, it, expect } from 'vitest';
import { extractText, setText } from '$lib/comps/forms/whatsapp/messages/builder/actions/text';
import { type Read } from '$lib/schema/communications/whatsapp/messages';

describe('extractText', () => {
	it('should extract text from a text message', () => {
		const message: Read['message'] = { type: 'text', text: { body: 'Hello', preview_url: false } };
		expect(extractText(message)).toBe('Hello');
	});

	it('should extract text from an interactive message', () => {
		const message: Read['message'] = {
			type: 'interactive',
			interactive: { type: 'button', action: { buttons: [] }, body: { text: 'Click here' } }
		};
		expect(extractText(message)).toBe('Click here');
	});

	it('should extract caption from an image message', () => {
		const message: Read['message'] = { type: 'image', image: { link: 'url', caption: 'An image' } };
		expect(extractText(message)).toBe('An image');
	});

	it('should return an empty string for other message types', () => {
		const message: Read['message'] = { type: 'audio', audio: { link: 'url' } } as any;
		expect(extractText(message)).toBe('');
	});
});

describe('setText', () => {
	it('should update the text body of a text message', () => {
		const message: Read['message'] = {
			type: 'text',
			text: { body: 'Old text', preview_url: false }
		};
		const updated = setText(message, 'New text');
		//@ts-expect-error - TS doesn't know that the type is 'text'
		expect(updated.text.body).toBe('New text');
	});

	it('should update the body text of an interactive message', () => {
		const message: Read['message'] = {
			type: 'interactive',
			interactive: { body: { text: 'Old text' }, action: { buttons: [] }, type: 'button' }
		};
		const updated = setText(message, 'New text');
		//@ts-expect-error - TS doesn't know that the type is 'interactive'
		expect(updated.interactive.body.text).toBe('New text');
	});

	it('should update the caption of an image message', () => {
		const message: Read['message'] = {
			type: 'image',
			image: { link: 'url', caption: 'Old caption' }
		};
		const updated = setText(message, 'New caption');
		//@ts-expect-error - TS doesn't know that the type is 'image'
		expect(updated.image.caption).toBe('New caption');
	});

	it('should return the original message for unsupported types', () => {
		const message: Read['message'] = { type: 'audio', audio: { link: 'url' } } as any;
		expect(setText(message, 'New text')).toEqual(message);
	});
});
