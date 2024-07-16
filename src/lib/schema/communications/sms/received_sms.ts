import { v, id, timestamp, longString } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	person_id: id,
	message: longString,
	received_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.omit(base, ['id', 'received_at']);
export type Create = v.InferOutput<typeof create>;
export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
