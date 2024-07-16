import { v, mediumString, id, count, timestamp } from '$lib/schema/valibot';
import { list as listPeople } from '$lib/schema/people/people';

export const base = v.object({
	id: id,
	instance_id: id,
	name: mediumString,
	ready: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.object({
	...v.omit(base, ['instance_id']).entries,
	count: v.pipe(v.number(), v.integer(), v.minValue(0))
});
export type Read = v.InferOutput<typeof read>;

export const readListWithPeople = v.object({
	...read.entries,
	people: listPeople
});

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.pick(base, ['name']);
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(v.pick(base, ['name']));
export type Update = v.InferOutput<typeof update>;

export const addPersonToList = v.object({
	person_id: id
});
export type AddPersonToList = v.InferOutput<typeof addPersonToList>;

export const removePersonFromList = v.object({
	success: v.literal(true)
});
export type RemovePersonFromList = v.InferOutput<typeof removePersonFromList>;

export const addPersonToListQueued = v.object({
	person_id: id,
	list_id: id
});
export type AddPersonToListQueued = v.InferOutput<typeof addPersonToListQueued>;
