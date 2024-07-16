import {
	v,
	count,
	shortStringNotEmpty,
	longString,
	uuid,
	id,
	timestamp
} from '$lib/schema/valibot';

import { read as readAdmin } from '$lib/schema/core/admin';

export const taskDetailsTypes = {
	generic: v.object({
		type: v.literal('generic')
	}),
	reply_to_email: v.object({
		type: v.literal('reply_to_email'),
		received_email_id: uuid
	}),
	reply_to_sms: v.object({
		type: v.literal('reply_to_sms'),
		received_sms_id: id
	}),
	event_mark_attendance: v.object({
		type: v.literal('event_mark_attendance'),
		event_id: id
	})
};

export const taskDetails = v.variant('type', [
	taskDetailsTypes.generic,
	taskDetailsTypes.reply_to_email,
	taskDetailsTypes.reply_to_sms,
	taskDetailsTypes.event_mark_attendance
]);

export const base = v.object({
	id: id,
	instance_id: id,
	assigned_to: id,
	name: shortStringNotEmpty,
	description: v.nullable(longString),
	details: taskDetails,
	created_at: timestamp,
	updated_at: timestamp,
	due_at: v.nullable(timestamp),
	completed_at: v.nullable(timestamp),
	viewed_at: v.nullable(timestamp)
});

export const read = v.object({
	...v.omit(base, ['instance_id', 'assigned_to']).entries,
	admin: readAdmin
});
export type Read = v.InferOutput<typeof read>;

export const create = v.object({
	name: base.entries.name,
	description: v.optional(base.entries.description),
	details: v.optional(base.entries.details, { type: 'generic' }),
	due_at: v.nullable(base.entries.due_at)
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(
	v.object({
		name: base.entries.name,
		description: base.entries.description,
		details: base.entries.details,
		due_at: base.entries.due_at,
		viewed_at: base.entries.viewed_at,
		completed_at: base.entries.completed_at
	})
);
export type Update = v.InferOutput<typeof update>;

export const list = v.object({
	items: v.array(read),
	count: count
});
export type List = v.InferOutput<typeof list>;
