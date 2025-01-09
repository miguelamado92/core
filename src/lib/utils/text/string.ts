export function clampString(str: string, maxLength: number): string {
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, maxLength);
}
import DOMPurify from 'isomorphic-dompurify';

/*
 * @param html - The HTML string to sanitize
 * @returns The sanitized HTML string
 */
export function sanitizeHTML(html: string): string {
	return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}

export function addLineBreaks(str: string): string {
	return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}
