import { v, id, timestamp, uuid, mediumString, longString } from '$lib/schema/valibot';

export const base = v.object({
	id: uuid,
	message_id: v.nullable(id),
	person_id: id,
	subject: mediumString,
	message: longString,
	received_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	message_id: v.optional(base.entries.message_id, null),
	person_id: base.entries.person_id,
	subject: base.entries.subject,
	message: base.entries.message
});
export type Create = v.InferOutput<typeof create>;
