import { v, id, timestamp, uuid, count } from '$lib/schema/valibot';
import { message } from '$lib/schema/communications/whatsapp/webhooks/messages';
import { whatsappInboundMessageReceived } from '$lib/schema/communications/whatsapp/webhooks/ycloud';

export const base = v.object({
	id: uuid,
	person_id: id,
	conversation_id: v.nullable(id),
	message: v.union([message, whatsappInboundMessageReceived.entries.whatsappInboundMessage]),
	reacted: v.boolean(),
	reacted_emoji: v.nullable(v.pipe(v.string(), v.length(1), v.emoji())),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	person_id: base.entries.person_id,
	conversation_id: v.optional(base.entries.conversation_id, null),
	message: base.entries.message,
	reacted: v.optional(base.entries.reacted, false),
	reacted_emoji: v.optional(base.entries.reacted_emoji, null)
});
export type Create = v.InferInput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
