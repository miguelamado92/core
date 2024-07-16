import { v, id, timestamp } from '$lib/schema/valibot';

export const base = v.object({
	id: id,
	message_id: id,
	list_id: id,
	sent_by_id: id,
	started_at: timestamp,
	completed_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.pick(base, ['list_id']);
export type Create = v.InferOutput<typeof create>;
