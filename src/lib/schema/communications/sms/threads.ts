import { v, timestamp, id, shortString } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	first_message_id: id,
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	first_message_id: base.entries.first_message_id
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
