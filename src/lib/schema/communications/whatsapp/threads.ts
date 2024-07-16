import { v, id, mediumString, timestamp, uuid, language, shortString } from '$lib/schema/valibot';
import { template } from '$lib/schema/communications/whatsapp/elements/template';

export const base = v.object({
	id: id,
	template_id: id,
	instance_id: id,
	name: shortString,
	template_message: template, //has params
	point_person_id: id,
	first_message_id: v.nullable(id),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	template_id: base.entries.template_id,
	name: base.entries.name,
	point_person_id: base.entries.point_person_id,
	template_message: base.entries.template_message
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
