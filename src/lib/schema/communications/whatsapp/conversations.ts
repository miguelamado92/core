import { v, id, timestamp, shortString, count } from '$lib/schema/valibot';

import { conversation_category } from '$lib/schema/communications/whatsapp/webhooks/webhook';

export const base = v.object({
	id: id,
	thread_id: id,
	person_id: id,
	whatsapp_id: shortString,
	type: conversation_category,
	expired: v.boolean(),
	started_at: timestamp,
	expires_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	thread_id: base.entries.thread_id,
	person_id: base.entries.person_id,
	whatsapp_id: base.entries.whatsapp_id,
	type: base.entries.type,
	expires_at: base.entries.expires_at
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;
