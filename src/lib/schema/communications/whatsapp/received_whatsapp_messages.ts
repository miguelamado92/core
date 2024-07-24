import { v, id, timestamp, uuid, count } from '$lib/schema/valibot';
import { message } from '$lib/schema/communications/whatsapp/elements/message';
export const base = v.object({
	id: uuid,
	person_id: id,
	conversation_id: id,
	message: message,
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
	conversation_id: base.entries.conversation_id,
	message: base.entries.message,
	reacted: v.optional(base.entries.reacted, false),
	reacted_emoji: v.optional(base.entries.reacted_emoji, null)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
