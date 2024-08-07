import {
	v,
	id,
	language,
	count,
	address,
	timestamp,
	shortString,
	uuid,
	mediumString,
	longString,
	mediumStringNotEmpty,
	DEFAULT_COUNTRY
} from '$lib/schema/valibot';

import { email, phoneNumber } from '$lib/schema/people/channels/channels';
import { base as tag } from '$lib/schema/core/tags';
import { readFromPerson } from '$lib/schema/people/custom_fields';
import { read as readAdmin } from '$lib/schema/core/admin';

export const base = v.object({
	id: id,
	instance_id: id,
	unique_id: uuid,
	full_name: mediumStringNotEmpty,
	preferred_name: v.nullable(mediumString),
	given_name: v.nullable(mediumString),
	given_name_alt: v.nullable(mediumString),
	family_name: v.nullable(mediumString),
	family_name_alt: v.nullable(mediumString),

	dob: v.nullable(timestamp),
	organization: v.nullable(shortString),
	position: v.nullable(shortString),

	details: v.nullable(longString),
	do_not_contact: v.boolean(),
	preferred_language: language,

	...address.entries,

	email: v.nullable(email),
	phone_number: v.nullable(phoneNumber),

	point_person_id: id,
	created_at: timestamp,
	updated_at: timestamp
});

export const create = v.object({
	...v.partial(
		v.omit(base, ['id', 'full_name', 'created_at', 'updated_at', 'instance_id', 'unique_id'])
	).entries,
	full_name: base.entries.full_name,
	country: v.optional(base.entries.country, DEFAULT_COUNTRY) //full_name is required
});

export type Create = v.InferOutput<typeof create>;

export const update = v.partial(create);
export type Update = v.InferOutput<typeof update>;

import { list as listInteractions } from '$lib/schema/people/interactions';
export const read = v.object({
	...v.omit(base, ['instance_id', 'point_person_id']).entries,
	tags: v.array(v.omit(tag, ['instance_id', 'created_at', 'updated_at'])),
	custom_fields: v.array(readFromPerson),
	point_person: readAdmin,
	interactions: listInteractions
});
export type Read = v.InferOutput<typeof read>;

export const list = v.object({ items: v.array(v.omit(read, ['interactions'])), count: count });
export type List = v.InferOutput<typeof list>;

export const _listWithSearch = v.object({
	items: v.array(v.object({ ...v.omit(read, ['interactions']).entries, search: longString })),
	count: count
});
export type _ListWithSearch = v.InferOutput<typeof _listWithSearch>;
