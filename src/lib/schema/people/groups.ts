import {
	v,
	id,
	count,
	shortStringNotEmpty,
	longString,
	uuid,
	timestamp
} from '$lib/schema/valibot';

import { list as listPeople } from '$lib/schema/people/people';
import { read as readGroupMembers } from '$lib/schema/people/group_members';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortStringNotEmpty,
	description: v.nullable(longString),
	whatsapp_id: v.nullable(shortStringNotEmpty),
	point_person_id: id,
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.object({
	...v.omit(base, ['instance_id']).entries,
	count: count,
	members: v.array(
		v.object({ ...listPeople.entries.items.item.entries, status: readGroupMembers.entries.status })
	)
});
export type Read = v.InferOutput<typeof read>;

export const create = v.object({
	name: base.entries.name,
	description: v.optional(base.entries.description),
	whatsapp_id: v.optional(base.entries.whatsapp_id)
});
export type Create = v.InferOutput<typeof create>;

export const linkWhatsappGroup = v.object({
	invitation_code: shortStringNotEmpty
});
export type LinkWhatsappGroup = v.InferOutput<typeof linkWhatsappGroup>;

export const update = v.partial(
	v.object({
		...create.entries,
		point_person_id: base.entries.point_person_id
	})
);
export type Update = v.InferOutput<typeof update>;

export const list = v.object({
	count: count,
	items: v.array(v.omit(read, ['members']))
});
export type List = v.InferOutput<typeof list>;
