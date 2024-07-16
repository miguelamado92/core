import { v, mediumString, id, timestamp, url } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	from: url,
	to: url,
	active: v.boolean(),
	canonical: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(v.omit(base, ['instance_id']));
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	from: base.entries.from,
	to: base.entries.to,
	active: v.optional(base.entries.active, true),
	canonical: v.optional(base.entries.canonical, false)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(
	v.object({
		...create.entries,
		active: base.entries.active
	})
);
export type Update = v.InferOutput<typeof update>;
