import { v, phoneNumber, id } from '$lib/schema/valibot';
export const base = v.object({
	id: id,
	instance_id: id,
	number: phoneNumber,
	active: v.boolean()
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	number: base.entries.number,
	active: base.entries.active
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
