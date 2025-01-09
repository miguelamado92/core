export function clampString(str: string, maxLength: number): string {
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, maxLength);
}
import { browser } from '$app/environment';
import DOMPurify from 'dompurify';

/*
 * @param html - The HTML string to sanitize
 * @returns The sanitized HTML string
 */
export function sanitizeHTML(html: string): string {
	// We really want this working on the server as well so that we can sanitize the HTML before it goes into the database.
	// In the future we should use https://github.com/kkomelin/isomorphic-dompurify to make this work on the server and avoid XSS vectors wherever we are likely to rendering user input as HTML.
	if (browser) {
		return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
	} else {
		throw new Error('Sanitizing HTML functionality is only available in the browser');
	}
}

export function addLineBreaks(str: string): string {
	return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}
