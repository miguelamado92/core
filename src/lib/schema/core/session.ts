import { v, id, timestamp, uuid } from '$lib/schema/valibot';

export const base = v.object({
	code: uuid,
	instance_id: id,
	admin_id: id,
	created_at: timestamp,
	expires_at: timestamp
});

export const create = v.pick(base, ['admin_id', 'instance_id']);

export type Create = v.InferOutput<typeof create>;

export const read = v.pick(base, ['code', 'admin_id']);

export type Read = v.InferOutput<typeof read>;
