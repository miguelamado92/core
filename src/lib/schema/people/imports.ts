import { v, url, timestamp, count, id } from '$lib/schema/valibot';
import { status } from '../communications/whatsapp/numbers';

export const base = v.object({
	id: id,
	instance_id: id,
	csv_url: url,
	status: v.picklist(['pending', 'processing', 'complete', 'failed']),
	total_rows: count,
	processed_rows: count,
	failed_rows: count,
	created_at: timestamp,
	completed_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const create = v.object({
	csv_url: base.entries.csv_url,
	status: v.optional(base.entries.status, 'pending')
});
export type Create = v.InferOutput<typeof create>;
export type CreateInput = v.InferInput<typeof create>;

export const list = v.object({
	items: v.array(read),
	count: count
});
export type List = v.InferOutput<typeof list>;

export const update = v.partial(
	v.object({
		status: v.optional(base.entries.status),
		total_rows: v.optional(base.entries.total_rows),
		processed_rows: v.optional(base.entries.processed_rows),
		failed_rows: v.optional(base.entries.failed_rows)
	})
);
export type Update = v.InferOutput<typeof update>;
