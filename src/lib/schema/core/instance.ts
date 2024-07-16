import { v, id, slug, language, country, timestamp, shortString, email } from '$lib/schema/valibot';

export const settings = v.object({
	default_admin_id: id,
	events: v.object({
		default_template_id: id,
		default_email_template_id: id
	}),
	communications: v.object({
		email: v.object({
			default_from_name: shortString,
			default_template_id: id
		})
	}),
	petitions: v.object({
		default_template_id: id
	}),
	website: v.object({
		default_template_id: id,
		pages_content_type_id: id,
		posts_content_type_id: id
	})
});
export type Settings = v.InferOutput<typeof settings>;

export const base = v.object({
	id: id,
	name: shortString,
	slug: slug,
	owner_email: email,
	language: language,
	installed: v.boolean(),
	country: country,
	created_at: timestamp,
	updated_at: timestamp,
	settings: settings
});

export const read = base;

export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);

export type List = v.InferOutput<typeof list>;

export const create = v.omit(base, ['id', 'created_at', 'updated_at']);
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(v.omit(base, ['id', 'created_at', 'updated_at']));

export type Update = v.InferOutput<typeof update>;
