import { v, id, timestamp } from '$lib/schema/valibot';
export const base = v.object({
	group_id: id,
	person_id: id,
	status: v.picklist(['member', 'admin', 'banned']),
	created_at: timestamp
});

export const create = v.object({
	person_id: id,
	status: base.entries.status
});
export type Create = v.InferOutput<typeof create>;

export const update = v.pick(base, ['status']);
export type Update = v.InferOutput<typeof update>;

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const del = v.object({ success: v.literal(true) });
export type Del = v.InferOutput<typeof del>;
