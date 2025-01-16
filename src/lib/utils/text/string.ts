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
	return DOMPurify.sanitize(html);
}

export function addLineBreaks(str: string): string {
	return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

export function slugify(str: string) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = 'àáäâæǎãåāèéëêìíïîòóœøõōöôùúüûñç·/-,:;';
	var to = 'aaaaaaaaaeeeeiiiioooooooouuuunc______';
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 _]/g, '') // remove invalid chars
		.replace(/\s+/g, '_') // collapse whitespace and replace by -
		.replace(/_+/g, '_'); // collapse dashes

	return str;
}
