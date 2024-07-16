import { v, longString, shortString, id, slug, count, timestamp } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	description: v.nullable(longString),
	slug: slug,
	html: longString,
	custom_css: v.nullable(longString),
	custom_js: v.nullable(longString),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;
export const list = v.object({
	count: count,
	items: v.array(v.omit(base, ['instance_id', 'description', 'html', 'custom_css', 'custom_js']))
});
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	description: v.optional(base.entries.description),
	slug: base.entries.slug,
	html: base.entries.html,
	custom_css: v.optional(base.entries.custom_css),
	custom_js: v.optional(base.entries.custom_js)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
