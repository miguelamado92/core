import {
	v,
	longString,
	shortString,
	customCode,
	htmlMetatags,
	id,
	count,
	slug,
	timestamp,
	shortStringNotEmpty,
	longStringNotEmpty,
	DEFAULT_CUSTOM_CODE,
	DEFAULT_HTML_METATAGS
} from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	content_type_id: id,
	template_id: id,
	name: shortStringNotEmpty,
	slug: slug,
	heading: shortStringNotEmpty,
	html: longStringNotEmpty,
	custom_code: customCode,
	html_metatags: htmlMetatags,
	active: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp,
	published_at: v.nullable(timestamp)
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.object({
	items: v.array(v.omit(base, ['html', 'custom_code', 'html_metatags'])),
	count: count
});
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	slug: base.entries.slug,
	heading: base.entries.heading,
	html: base.entries.html,
	custom_code: v.optional(base.entries.custom_code, DEFAULT_CUSTOM_CODE),
	html_metatags: v.optional(base.entries.html_metatags, DEFAULT_HTML_METATAGS)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(
	v.object({
		...create.entries,
		active: base.entries.active
	})
);
export type Update = v.InferOutput<typeof update>;
