import { v, id, shortString, count, timestamp } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	active: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;
export const listOfTags = v.array(read); //useful for the tags widget
export type ListOfTags = v.InferOutput<typeof listOfTags>;

export const create = v.pick(base, ['name']);
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(v.pick(base, ['name', 'active']));
export type Update = v.InferOutput<typeof update>;
