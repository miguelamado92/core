import { db, pool, redis, pino, BelcodaError, error, filterQuery, type s } from '$lib/server';
import { format } from 'node-pg-format';
import * as schema from '$lib/schema/people/people';
import { read as instanceApi } from '$lib/server/api/core/instances';

import { DEFAULT_COUNTRY, DEFAULT_LANGUAGE } from '$lib/i18n';

import { getUniqueKeys } from '$lib/utils/objects/get_unique_keys';
import { parse, v, mediumString, longString } from '$lib/schema/valibot';
import event from '$lib/server/hooks/website/handlers/event';

export const redisString = (instance_id: number, person_id: number | 'all') =>
	`i:${instance_id}:people:${person_id}`;

const log = pino('$lib/server/api/people/people');

async function queueCustomFieldSet({
	objectSchema,
	body,
	instance_id,
	admin_id,
	person_id,
	queue
}: {
	objectSchema: typeof schema.create | typeof schema.update;
	body: schema.Create | schema.Update;
	instance_id: number;
	admin_id?: number | undefined;
	person_id: number;
	queue: App.Queue;
}) {
	const all_fields = v.parse(v.looseObject({ ...objectSchema.entries }), body); //gets all fields...
	const parsed = v.parse(objectSchema, body);
	const uniqueKeys = getUniqueKeys(all_fields, parsed);
	const customFieldRecord = v.record(mediumString, longString);
	const customFields = v.parse(customFieldRecord, uniqueKeys);
	const promiseArr = [];
	for (const field in customFields) {
		const value = customFields[field];
		promiseArr.push(
			queue(
				'core/people/custom_fields/set_custom_field',
				instance_id,
				{
					person_id: person_id,
					field: field,
					value: value
				},
				admin_id
			)
		);
	}
	await Promise.all(promiseArr);
}

export async function create({
	instance_id,
	admin_id,
	body,
	t,
	queue
}: {
	instance_id: number;
	admin_id?: number;
	body: schema.Create;
	t: App.Localization;
	queue: App.Queue;
}) {
	const parsed = parse(schema.create, body);
	const point_person_id =
		parsed.point_person_id ||
		admin_id ||
		(await instanceApi({ instance_id })).settings.default_admin_id;
	const toInsert = {
		instance_id,
		point_person_id: point_person_id,
		country: parsed.country || DEFAULT_COUNTRY,
		preferred_language: parsed.preferred_language || DEFAULT_LANGUAGE,
		...parsed
	};
	const inserted = await db.insert('people.people', toInsert).run(pool);

	//now we want to add the custom fields that might be included...
	await queueCustomFieldSet({
		objectSchema: schema.create,
		body,
		instance_id,
		admin_id,
		person_id: inserted.id,
		queue: queue
	});
	await redis.del(redisString(instance_id, 'all'));
	const person = await read({ instance_id, person_id: inserted.id, t });
	return person;
}

export async function update({
	instance_id,
	person_id,
	body,
	admin_id,
	t,
	queue
}: {
	instance_id: number;
	person_id: number;
	admin_id: number;
	body: schema.Update;
	t: App.Localization;
	queue: App.Queue;
}) {
	const parsed = parse(schema.update, body);
	const updated = await db
		.update(
			'people.people',
			{
				...parsed
			},
			{ instance_id, id: person_id }
		)
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:PEOPLE:PEOPLE:UPDATE:01', t.errors.updating_data(), err);
		});
	if (updated.length !== 1)
		throw new BelcodaError(404, 'DATA:PEOPLE:PEOPLE:UPDATE:01', t.errors.http[404]());
	await queueCustomFieldSet({
		objectSchema: schema.update,
		body,
		instance_id,
		admin_id,
		person_id: updated[0].id,
		queue: queue
	});
	await redis.del(redisString(instance_id, person_id));
	await redis.del(redisString(instance_id, 'all'));
	const person = await read({ instance_id, person_id: updated[0].id, t });
	return person;
}

export async function read({
	instance_id,
	person_id,
	t
}: {
	instance_id: number;
	person_id: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instance_id, person_id));
	if (cached) {
		return v.parse(schema.read, cached);
	}
	const person = await db
		.selectExactlyOne(
			'people.people',
			{ instance_id, id: person_id },
			{
				lateral: {
					custom_fields: db.select(
						'people.custom_field_values',
						{
							person_id: person_id
						},
						{
							lateral: {
								field: db.selectExactlyOne('people.custom_fields', {
									id: db.parent('custom_field_id')
								})
							}
						}
					),
					interactions: db.select(
						'people.interactions',
						{ person_id: person_id },
						{
							order: { by: 'created_at', direction: 'DESC' },
							lateral: {
								admin: db.selectExactlyOne('admins', { id: db.parent('admin_id') })
							}
						}
					),
					tags: db.select(
						'people.taggings',
						{ person_id: person_id },
						{
							lateral: db.selectExactlyOne('tags', { id: db.parent('tag_id') })
						}
					),
					point_person: db.selectExactlyOne('admins', {
						id: db.parent('point_person_id')
					})
				}
			}
		)
		.run(pool)
		.catch((err) => {
			return error(404, 'DATA:PEOPLE:PEOPLE:READ:01', t.errors.not_found(), err);
		});
	const parsed = v.parse(schema.read, person);
	await redis.set(redisString(instance_id, person_id), parsed);
	return parsed;
}

export async function getIdsFromEmailPhoneNumber({
	instanceId,
	email,
	phoneNumber
}: {
	instanceId: number;
	email?: string | null;
	phoneNumber?: string | null;
}): Promise<number[]> {
	log.debug('getIdsFromEmailPhoneNumber');
	const peopleIds = await db.sql<s.people.people.SQL, s.people.people.Selectable[]>`
	SELECT id FROM ${'people.people'} WHERE (email->>'email' = ${db.param(email)} OR phone_number->>'phone_number' = ${db.param(phoneNumber)}) AND ${'instance_id'} = ${db.param(instanceId)}`.run(
		pool
	);
	const ids = peopleIds.map((f) => f.id);
	log.debug('getIdsFromEmailPhoneNumber done');
	return ids;
}

export async function list({
	instance_id,
	url,
	t,
	notPaged
}: {
	instance_id: number;
	url: URL;
	t: App.Localization;
	notPaged?: boolean;
}): Promise<schema.List | schema._ListWithSearch> {
	const query = filterQuery(url, {
		search_key: 'search',
		notPaged
	});
	if (query.filtered === false) {
		const cached = await redis.get(redisString(instance_id, 'all'));
		if (cached) {
			return v.parse(schema.list, cached);
		}
	}
	const selected = await db
		.select(
			'people.people_search',
			{ instance_id: instance_id, ...query.where },
			{
				...query.options,
				lateral: {
					custom_fields: db.select(
						'people.custom_field_values',
						{
							person_id: db.parent('id')
						},
						{
							lateral: {
								field: db.selectExactlyOne('people.custom_fields', {
									id: db.parent('custom_field_id')
								})
							}
						}
					),
					tags: db.select(
						'people.taggings',
						{ person_id: db.parent('id') },
						{
							lateral: db.selectExactlyOne('tags', { id: db.parent('tag_id') })
						}
					),
					point_person: db.selectExactlyOne('admins', {
						id: db.parent('point_person_id')
					})
				}
			}
		)
		.run(pool);
	const count = await db
		.count('people.people_search', { instance_id: instance_id, ...query.where })
		.run(pool);
	if (url.searchParams.get('_withSearch')) {
		const parsed = parse(schema._listWithSearch, { count: count, items: selected });
		return parsed;
	} else {
		const parsed = parse(schema.list, { count: count, items: selected });
		return parsed;
	}
}

export async function exists({
	instanceId,
	personId,
	t
}: {
	instanceId: number;
	personId: number;
	t: App.Localization;
}): Promise<true> {
	const cached = await redis.get(redisString(instanceId, personId));
	if (cached) {
		return true;
	}
	await db
		.selectExactlyOne('people.people', { instance_id: instanceId, id: personId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:PEOPLE:PEOPLE:EXISTS:01',
				t.errors.not_found_variants.person(),
				err
			);
		});
	//will throw an error if it doesn't exist...
	return true;
}

export async function _updateWhatsappId({
	instanceId,
	personId,
	whatsappId
}: {
	instanceId: number;
	personId: number;
	whatsappId: string;
}): Promise<true> {
	log.debug('_updateWhatsappId');
	const sql = format(
		`UPDATE people.people SET "phone_number" = jsonb_set("phone_number", '{whatsapp_id}', %L) WHERE id = %L AND instance_id = %L`,
		`"${whatsappId}"`,
		personId,
		instanceId
	);
	await db.sql`${db.raw(sql)}`.run(pool);
	await redis.del(redisString(instanceId, personId));
	await redis.del(redisString(instanceId, 'all'));
	log.debug('_updateWhatsappId done');
	return true;
}
import { parsePhoneNumber } from 'awesome-phonenumber';

export async function _getPersonByWhatsappId({
	instanceId,
	whatsappId,
	t
}: {
	instanceId: number;
	whatsappId: string;
	t: App.Localization;
}): Promise<schema.Read> {
	const phoneNumber = parsePhoneNumber(whatsappId);
	const parsedPhoneNumber = phoneNumber.valid ? phoneNumber.number.e164 : whatsappId;
	log.debug('_getPersonByWhatsappId');
	log.debug(whatsappId);
	const person =
		await db.sql`SELECT id FROM ${'people.people'} WHERE (phone_number->>'whatsapp_id' = ${db.param(whatsappId)} OR phone_number->>'phone_number' = ${db.param(parsedPhoneNumber)}) AND instance_id = ${db.param(instanceId)}`.run(
			pool
		);
	log.info(whatsappId);
	if (person.length !== 1) {
		throw new BelcodaError(
			404,
			'DATA:PEOPLE:PEOPLE:GET_PERSON_BY_WHATSAPP_ID:01',
			t.errors.not_found_variants.person()
		);
	}
	log.debug('_getPersonByWhatsappId done');
	return await read({ instance_id: instanceId, person_id: person[0].id, t });
}
