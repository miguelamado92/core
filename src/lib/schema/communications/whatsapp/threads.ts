import { v, id, mediumString, timestamp, count, language, shortString } from '$lib/schema/valibot';
import { messageTypes } from '$lib/schema/communications/whatsapp/elements/message';
export const base = v.object({
	id: id,
	template_id: id,
	instance_id: id,
	name: shortString,
	template_message: messageTypes.template, //has params
	point_person_id: id,
	created_at: timestamp,
	updated_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
