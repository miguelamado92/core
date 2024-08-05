import { v, shortString, mediumString, uuid, url } from '$lib/schema/valibot';

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

export const urlButtonParam = v.object({
	type: v.literal('text'),
	text: shortString
});

export const quickReplyButtonParam = v.object({
	type: v.literal('payload'),
	payload: uuid
});

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
	button: v.variant('type', [quickReplyButtonParam, urlButtonParam])
};

export type ParametersText = v.InferOutput<typeof parameters.text>;
export type ParametersDocument = v.InferOutput<typeof parameters.document>;
export type ParametersImage = v.InferOutput<typeof parameters.image>;
export type ParametersVideo = v.InferOutput<typeof parameters.video>;
export type ParametersDateTime = v.InferOutput<typeof parameters.date_time>;
export type ParametersButton = v.InferOutput<typeof parameters.button>;

export type HeaderParams =
	| ParametersText
	| ParametersDocument
	| ParametersImage
	| ParametersVideo
	| ParametersDateTime;
export type BodyParams = ParametersText | ParametersDateTime;
export type ButtonParams = ParametersButton;

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
		parameters: v.array(v.union([parameters.text, parameters.date_time]))
	}),
	button: v.object({
		type: v.literal('button'),
		sub_type: v.picklist(['url', 'quick_reply']),
		parameters: v.array(parameters.button),
		index: v.pipe(v.number(), v.minValue(0), v.maxValue(9))
	})
};

export type TemplateMessageButtonComponentParameter = v.InferOutput<typeof components.button>;

export const template = v.object({
	name: v.pipe(v.string(), v.maxLength(512)),
	category: v.optional(v.picklist(['MARKETING', 'UTILITY']), 'MARKETING'),
	allow_category_change: v.optional(v.boolean(), true),
	components: v.array(v.union([components.header, components.body, components.button]))
});
export type Template = v.InferOutput<typeof template>;
