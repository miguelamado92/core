import { v, id, timestamp, uuid, emailMessage } from '$lib/schema/valibot';

export const base = v.object({
	id: uuid,
	message_id: id,
	person_id: id,
	sent_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.omit(base, ['sent_at']);
export type Create = v.InferOutput<typeof create>;
