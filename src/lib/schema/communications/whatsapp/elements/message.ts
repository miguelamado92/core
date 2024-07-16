import { v, uuid } from '$lib/schema/valibot';
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

export const messageBase = v.object({
	type: type,
	to: v.string(),
	biv_opaque_callback_data: uuid,
	messaging_product: v.optional(v.literal('whatsapp'), 'whatsapp'),
	recipient_type: v.optional(v.literal('individual'), 'individual'),
	context: v.optional(context)
});

export const messageTypes = {
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
