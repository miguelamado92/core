import { v, id, mediumString, timestamp, uuid, language, shortString } from '$lib/schema/valibot';

const templateButtonTypes = {
	phone: v.object({
		type: v.literal('PHONE_NUMBER'),
		text: v.pipe(v.string(), v.maxLength(25)),
		phone_number: v.pipe(v.string(), v.maxLength(20))
	}),
	url: v.object({
		type: v.literal('URL'),
		text: v.pipe(v.string(), v.maxLength(25)),
		url: v.pipe(v.string(), v.maxLength(200)),
		example: v.optional(v.array(v.pipe(v.string(), v.maxLength(2000))))
	}),
	quickReply: v.object({
		type: v.literal('QUICK_REPLY'),
		text: v.pipe(v.string(), v.maxLength(25))
	})
};

export const templateComponents = {
	headers: {
		text: v.object({
			type: v.literal('HEADER'),
			format: v.literal('TEXT'),
			text: v.pipe(v.string(), v.maxLength(60)),
			example: v.optional(
				v.object({
					header_text: v.pipe(v.string(), v.maxLength(60))
				})
			)
		}),
		media: v.object({
			type: v.literal('HEADER'),
			format: v.picklist(['IMAGE', 'VIDEO', 'DOCUMENT']),
			example: v.object({
				header_handle: v.array(mediumString)
			})
		}),
		location: v.object({
			type: v.literal('HEADER'),
			format: v.literal('LOCATION')
		})
	},
	body: v.object({
		type: v.literal('BODY'),
		format: v.literal('TEXT'),
		text: v.pipe(v.string(), v.maxLength(1024)),
		example: v.optional(
			v.object({
				body_text: v.pipe(v.string(), v.maxLength(1024))
			})
		)
	}),
	footer: v.object({
		type: v.literal('FOOTER'),
		text: v.pipe(v.string(), v.maxLength(60))
	}),
	buttons: v.object({
		type: v.literal('BUTTONS'),
		buttons: v.array(
			v.variant('type', [
				templateButtonTypes.phone,
				templateButtonTypes.url,
				templateButtonTypes.quickReply
			])
		)
	})
};

export type TemplateComponentsHeaderImage = v.InferOutput<typeof templateComponents.headers.media>;
export type TemplateComponentsHeaderLocation = v.InferOutput<
	typeof templateComponents.headers.location
>;
export type TemplateComponentsHeaderText = v.InferOutput<typeof templateComponents.headers.text>;
export type TemplateComponentsBody = v.InferOutput<typeof templateComponents.body>;
export type TemplateComponentsFooter = v.InferOutput<typeof templateComponents.footer>;

export const template = v.object({
	name: shortString,
	category: v.picklist(['MARKETING', 'UTILITY']),
	allow_category_change: v.boolean(),
	language: language,
	components: v.array(
		v.variant('type', [
			templateComponents.headers.text,
			templateComponents.headers.media,
			templateComponents.headers.location,
			templateComponents.body,
			templateComponents.footer,
			templateComponents.buttons
		])
	)
});
export type Template = v.InferOutput<typeof template>;
