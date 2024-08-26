import { message } from '$lib/schema/communications/whatsapp/webhooks/messages';
import { timestamp, id, uuid, v, count } from '$lib/schema/valibot';
import { simplePersonRecord } from '$lib/schema/people/people';
export const base = v.object({
	id: uuid,
	instance_id: id,
	person_id: id,
	group_id: id,
	platform: v.literal('whapi.cloud'),
	message: message,
	received_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({
	items: v.array(
		v.object({
			...read.entries,
			person: simplePersonRecord
		})
	),
	count: count
});
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	person_id: base.entries.person_id,
	group_id: base.entries.group_id,
	platform: v.optional(base.entries.platform, 'whapi.cloud'),
	message: base.entries.message
});
export type Create = v.InferOutput<typeof create>;
