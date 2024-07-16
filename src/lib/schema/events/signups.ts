import { v, id, timestamp } from '$lib/schema/valibot';

export const signupChannels = v.picklist([
	'website',
	'api',
	'import',
	'whatsapp',
	'sms',
	'manual',
	'email'
]);

export const base = v.object({
	event_id: id,
	person_id: id,
	channel: v.optional(signupChannels, 'website'),
	created_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(base);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	person_id: base.entries.person_id,
	channel: base.entries.channel
});
export type Create = v.InferOutput<typeof create>;

export const update = v.pick(base, ['channel']);
export type Update = v.InferOutput<typeof update>;
