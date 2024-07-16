import { v, id, timestamp } from '$lib/schema/valibot';
export const base = v.object({
	event_id: id,
	tag_id: id,
	created_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

import { read as readTag } from '$lib/schema/core/tags';
export const list = v.array(readTag);

export type List = v.InferOutput<typeof list>;

export const del = v.object({ success: v.literal(true) });
export type Del = v.InferOutput<typeof del>;
