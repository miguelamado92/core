import {
	v,
	id,
	timestamp,
	email,
	longString,
	shortString,
	mediumString
} from '$lib/schema/valibot';
export const base = v.object({
	id: id,
	instance_id: id,
	template_id: id,
	name: shortString,
	from: mediumString,
	reply_to: mediumString,
	subject: mediumString,
	preview_text: longString,
	html: longString,
	text: longString,
	point_person_id: id,
	use_html_for_plaintext: v.boolean(),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(v.omit(base, ['instance_id', 'html', 'text']));
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	template_id: v.optional(base.entries.template_id),
	name: base.entries.name,
	from: base.entries.from,
	reply_to: base.entries.reply_to,
	subject: base.entries.subject,
	preview_text: base.entries.preview_text,
	html: base.entries.html,
	text: base.entries.text,
	point_person_id: base.entries.point_person_id,
	use_html_for_plaintext: v.optional(base.entries.use_html_for_plaintext, true)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;

export const sendTestEmail = v.object({
	email: email,
	message: read,
	context: v.object({
		event_id: v.optional(v.nullable(id)),
		person_id: v.optional(v.nullable(id))
	})
});
export type SendTestEmail = v.InferOutput<typeof sendTestEmail>;
