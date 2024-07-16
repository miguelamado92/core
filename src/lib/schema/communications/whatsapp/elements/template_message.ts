import { v, shortString, uuid } from '$lib/schema/valibot';
import { document, image, video } from '$lib/schema/communications/whatsapp/elements/media';

export const parameters = {
	text: v.object({
		type: v.literal('text'),
		text: v.pipe(v.string(), v.maxLength(32768))
	}),
	document: v.object({
		type: v.literal('document'),
		document: document
	}),
	image: v.object({
		type: v.literal('image'),
		image: image
	}),
	video: v.object({
		type: v.literal('video'),
		video: video
	}),
	date_time: v.object({
		type: v.literal('date_time'),
		date_time: v.object({
			fallback_value: shortString
		})
	}),
	button: v.object({
		type: v.picklist(['payload', 'text']),
		payload: uuid, //required for quick reply buttons
		text: v.optional(v.string()) //reqired for url buttons, this text is appended to the URL defined in the template
	})
};

export const components = {
	header: v.object({
		type: v.literal('header'),
		parameters: v.array(
			v.union([
				parameters.text,
				parameters.document,
				parameters.image,
				parameters.video,
				parameters.date_time
			])
		)
	}),
	body: v.object({
		type: v.literal('body'),
		parameters: v.array(
			v.union([
				parameters.text,
				parameters.document,
				parameters.image,
				parameters.video,
				parameters.date_time
			])
		)
	}),
	button: v.object({
		type: v.literal('button'),
		subtype: v.picklist(['url', 'quick_reply']),
		parameters: v.array(parameters.button),
		index: v.pipe(v.number(), v.minValue(0), v.maxValue(9))
	})
};

export const template = v.object({
	name: v.pipe(v.string(), v.maxLength(512)),
	category: v.optional(v.picklist(['MARKETING', 'UTILITY']), 'MARKETING'),
	allow_category_change: v.optional(v.boolean(), true),
	components: v.array(v.union([components.header, components.body, components.button]))
});
export type Template = v.InferOutput<typeof template>;
