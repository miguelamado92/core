import {
	v,
	id,
	count,
	timestamp,
	longString,
	url,
	shortStringNotEmpty,
	mediumStringNotEmpty
} from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	file_name: mediumStringNotEmpty,
	mime_type: shortStringNotEmpty,
	size: count,
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
	url: base.entries.url,
	file_name: base.entries.file_name,
	mime_type: base.entries.mime_type,
	size: base.entries.size
});
export type Create = v.InferOutput<typeof create>;

export const createLink = v.object({
	file_name: longString
});

export const returnLink = v.object({
	put_url: url
});
