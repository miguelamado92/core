import {
	v,
	id,
	count,
	timestamp,
	htmlMetatags,
	customCode,
	shortString,
	longString,
	url,
	mediumString
} from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	name: mediumString,
	url: url,
	created_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({
	count: count,
	items: v.array(v.omit(base, ['instance_id']))
});
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	url: base.entries.url
});
export type Create = v.InferOutput<typeof create>;

export const createLink = v.object({
	file_name: longString
});

export const returnLink = v.object({
	put_url: url
});
