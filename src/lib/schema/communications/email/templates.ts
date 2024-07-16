import {
	v,
	id,
	timestamp,
	count,
	longString,
	shortString,
	mediumString
} from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	from: mediumString,
	reply_to: mediumString,
	subject: mediumString,
	preview_text: longString,
	html: longString,
	text: longString,
	active: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({
	count: count,
	items: v.array(v.omit(base, ['instance_id', 'html', 'text']))
});

export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	from: base.entries.from,
	reply_to: base.entries.reply_to,
	subject: base.entries.subject,
	preview_text: base.entries.preview_text,
	html: base.entries.html,
	text: base.entries.text,
	active: v.optional(base.entries.active, true)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
