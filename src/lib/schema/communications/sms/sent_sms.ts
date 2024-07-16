import { v, id, timestamp } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	message_id: id,
	person_id: id,
	sent_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.omit(base, ['id', 'sent_at']);
export type Create = v.InferOutput<typeof create>;
export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
