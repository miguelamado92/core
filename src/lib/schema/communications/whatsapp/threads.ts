import { v, id, mediumString, timestamp, count, uuid, shortString } from '$lib/schema/valibot';
import { messageTypes } from '$lib/schema/communications/whatsapp/elements/message';
import { actions } from '$lib/schema/communications/actions/actions';
export const base = v.object({
	id: id,
	template_id: id,
	instance_id: id,
	actions: actions,
	name: shortString,
	//template_message: messageTypes.template, //has params
	template_message_id: uuid,
	point_person_id: id,
	created_at: timestamp,
	updated_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	actions: v.optional(base.entries.actions, {}),
	template_id: v.optional(base.entries.template_id)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(
	v.object({
		name: v.optional(base.entries.name),
		actions: v.optional(base.entries.actions),
		//template_message: v.optional(base.entries.template_message),
		template_id: v.optional(base.entries.template_id)
	})
);
export type Update = v.InferOutput<typeof update>;
