import { v, id, timestamp, count } from '$lib/schema/valibot';
import { read as readList } from '$lib/schema/people/lists';
export const base = v.object({
	id: id,
	thread_id: id,
	list_id: id,
	sent_by_id: id,
	started_at: timestamp,
	completed_at: v.nullable(timestamp)
});

export const read = v.object({
	...v.omit(base, ['list_id']).entries,
	list: v.omit(readList, ['count']),
	delivered: count,
	read: count
});
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(read), count: count });
export type List = v.InferOutput<typeof list>;

export const create = v.pick(base, ['list_id']);
export type Create = v.InferOutput<typeof create>;

export const update = v.pick(base, ['completed_at']);
export type Update = v.InferOutput<typeof update>;
