import { v, uuid, id } from '$lib/schema/valibot';
import {
	audio,
	document,
	image,
	location,
	text,
	sticker,
	video,
	type,
	template
} from '$lib/schema/communications/whatsapp/elements/media';
import { interactive } from '$lib/schema/communications/whatsapp/elements/interactive';
import { context } from '$lib/schema/communications/whatsapp/elements/reactions';

export const allowableTypes = v.picklist(['text', 'image', 'interactive']);
export type AllowableTypes = v.InferOutput<typeof allowableTypes>;

export const messageBase = v.object({
	type: type,
	to: v.string(),
	biz_opaque_callback_data: uuid,
	messaging_product: v.optional(v.literal('whatsapp'), 'whatsapp'),
	recipient_type: v.optional(v.literal('individual'), 'individual'),
	context: v.optional(context)
});

export const messageTypes = {
	audio: v.object({
		//...messageBase.entries,
		type: v.literal('audio'),
		audio: audio
	}),
	document: v.object({
		//...messageBase.entries,
		type: v.literal('document'),
		document: document
	}),
	image: v.object({
		//...messageBase.entries,
		type: v.literal('image'),
		image: image
	}),
	location: v.object({
		//...messageBase.entries,
		type: v.literal('location'),
		location: location
	}),
	text: v.object({
		//...messageBase.entries,
		type: v.literal('text'),
		text: text
	}),
	video: v.object({
		//...messageBase.entries,
		type: v.literal('video'),
		video: video
	}),
	sticker: v.object({
		//...messageBase.entries,
		type: v.literal('sticker'),
		sticker: sticker
	}),
	interactive: v.object({
		//...messageBase.entries,
		type: v.literal('interactive'),
		interactive: interactive
	}),
	template: v.object({
		//...messageBase.entries,
		type: v.literal('template'),
		template: template
	})
};
export type TemplateMessage = v.InferOutput<typeof messageTypes.template>;

export const messageTypesWithBase = {
	audio: v.object({
		...messageBase.entries,
		type: v.literal('audio'),
		audio: audio
	}),
	document: v.object({
		...messageBase.entries,
		type: v.literal('document'),
		document: document
	}),
	image: v.object({
		...messageBase.entries,
		type: v.literal('image'),
		image: image
	}),
	location: v.object({
		...messageBase.entries,
		type: v.literal('location'),
		location: location
	}),
	text: v.object({
		...messageBase.entries,
		type: v.literal('text'),
		text: text
	}),
	video: v.object({
		...messageBase.entries,
		type: v.literal('video'),
		video: video
	}),
	sticker: v.object({
		...messageBase.entries,
		type: v.literal('sticker'),
		sticker: sticker
	}),
	interactive: v.object({
		...messageBase.entries,
		type: v.literal('interactive'),
		interactive: interactive
	}),
	template: v.object({
		...messageBase.entries,
		type: v.literal('template'),
		template: template
	})
};
export const messageWithBase = v.variant('type', [
	messageTypesWithBase.audio,
	messageTypesWithBase.document,
	messageTypesWithBase.image,
	messageTypesWithBase.location,
	messageTypesWithBase.text,
	messageTypesWithBase.video,
	messageTypesWithBase.sticker,
	messageTypesWithBase.interactive,
	messageTypesWithBase.template
]);
export type MessageWithBase = v.InferOutput<typeof messageWithBase>;

export const message = v.variant('type', [
	messageTypes.audio,
	messageTypes.document,
	messageTypes.image,
	messageTypes.location,
	messageTypes.text,
	messageTypes.video,
	messageTypes.sticker,
	messageTypes.interactive,
	messageTypes.template
]);
export type Message = v.InferOutput<typeof message>;

export const sendMessage = v.object({
	person_id: id,
	message_id: uuid,
	from_admin_id: id
});
export type SendMessage = v.InferOutput<typeof sendMessage>;

export const successfulResponse = v.object({
	messaging_product: v.literal('whatsapp'),
	contacts: v.array(
		v.object({
			input: v.string(),
			wa_id: v.string()
		})
	),
	messages: v.array(
		v.object({
			id: v.string(),
			message_status: v.optional(v.picklist(['held_for_quality_assessment', 'accepted']))
		})
	)
});
