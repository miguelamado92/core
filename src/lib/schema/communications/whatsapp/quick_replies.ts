import { v, id, uuid, timestamp, count } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	message_id: uuid,
	thread_id: id,
	created_at: timestamp
});

export const read = v.omit(base, ['thread_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	message_id: base.entries.message_id //this is the message that will be available as a quick reply for the thread
});
export type Create = v.InferOutput<typeof create>;
