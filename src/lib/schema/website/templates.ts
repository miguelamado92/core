import {
	v,
	id,
	count,
	timestamp,
	htmlMetatags,
	customCode,
	shortString,
	longString,
	longStringNotEmpty
} from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	description: v.nullable(longString),
	html: longStringNotEmpty,
	custom_code: customCode,
	html_metatags: htmlMetatags,
	active: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({
	count: count,
	items: v.array(
		v.omit(base, ['instance_id', 'description', 'html', 'custom_code', 'html_metatags'])
	)
});
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	description: v.optional(base.entries.description),
	html: base.entries.html,
	custom_code: base.entries.custom_code,
	html_metatags: base.entries.html_metatags
});
export type Create = v.InferOutput<typeof create>;
export type CreateInput = v.InferInput<typeof create>;

export const update = v.partial(
	v.object({
		...create.entries,
		active: base.entries.active
	})
);
export type Update = v.InferOutput<typeof update>;
