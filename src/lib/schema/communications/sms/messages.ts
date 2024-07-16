import { v, timestamp, id, longString } from '$lib/schema/valibot';
import { actions, keyword_triggers } from '$lib/schema/communications/actions/actions';

export const base = v.object({
	id: id,
	instance_id: id,
	sms_number_id: id,
	message: longString,
	actions: actions,
	keywords: keyword_triggers,
	next: v.nullable(id),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	sms_number_id: base.entries.sms_number_id,
	message: base.entries.message,
	actions: v.optional(base.entries.actions, {}),
	keywords: v.optional(base.entries.keywords, {}),
	next: v.optional(base.entries.next, null)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
