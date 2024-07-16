import { v, id, phoneNumber, timestamp, uuid, language, shortString } from '$lib/schema/valibot';

export const status = v.picklist(['NOT_SUBMITTED', 'SUBMITTED', 'APPROVED', 'REJECTED']);

export const base = v.object({
	instance_id: id,
	number: phoneNumber,
	whatsapp_id: shortString,
	status: status,
	created_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	number: base.entries.number,
	whatsapp_id: base.entries.whatsapp_id,
	status: v.optional(base.entries.status, 'NOT_SUBMITTED')
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(v.omit(create, ['status']));
export type Update = v.InferOutput<typeof update>;
