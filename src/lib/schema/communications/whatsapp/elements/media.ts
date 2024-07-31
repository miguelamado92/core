import { mediumString, language, DEFAULT_LANGUAGE, v, url } from '$lib/schema/valibot';
import { components } from '$lib/schema/communications/whatsapp/elements/template_message';

export const type = v.picklist([
	'text',
	'image',
	'video',
	'audio',
	'document',
	'location',
	'sticker',
	'interactive'
]);

export const audio = v.object({
	link: url
});

export const document = v.object({
	link: url,
	filename: mediumString,
	caption: v.optional(mediumString)
});

export const image = v.object({
	link: url,
	caption: v.optional(mediumString)
});

export const video = v.object({
	link: url,
	caption: v.optional(mediumString)
});
export const sticker = v.object({
	link: url,
	animated: v.optional(v.boolean(), false)
});

export const text = v.object({
	body: mediumString,
	preview_url: v.optional(v.boolean(), true)
});

export const location = v.object({
	latitute: v.pipe(v.number(), v.minValue(-180), v.maxValue(180)),
	longitude: v.pipe(v.number(), v.minValue(-180), v.maxValue(180)),
	name: mediumString,
	address: mediumString
});

export const template = v.object({
	name: v.pipe(v.string(), v.maxLength(512)),
	language: v.object({
		policy: v.optional(v.literal('deterministic'), 'deterministic'),
		code: v.optional(language, DEFAULT_LANGUAGE)
	}),
	components: v.array(v.union([components.header, components.body, components.button]))
});
