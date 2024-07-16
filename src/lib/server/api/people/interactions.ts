import { db, pool, redis, filterQuery } from '$lib/server';
import {
	create as createSchema,
	type Create,
	type List,
	list as listSchema
} from '$lib/schema/people/interactions';
import { parse } from '$lib/schema/valibot';
import {
	exists as personExists,
	redisString as personRedisString
} from '$lib/server/api/people/people';
import { exists as adminExists } from '$lib/server/api/core/admins';

function redisString(instance_id: number, person_id: number) {
	return `i:${instance_id}:interactions:${person_id}`;
}

export async function list({
	instanceId,
	personId,
	url
}: {
	instanceId: number;
	personId: number;
	url: URL;
}): Promise<List> {
	const { filtered, where, options } = filterQuery(url);
	if (!filtered) {
		const cached = await redis.get(redisString(instanceId, personId));
		if (cached) {
			return parse(listSchema, cached);
		}
	}
	const interactions = await db
		.select(
			'people.interactions',
			{ instance_id: instanceId, person_id: personId, ...where },
			{
				order: { by: 'created_at', direction: 'DESC' },
				offset: options.offset,
				limit: options.limit,
				lateral: {
					admin: db.selectExactlyOne('admins', { id: db.parent('admin_id') })
				}
			}
		)
		.run(pool);
	const parsed = parse(listSchema, interactions);
	await redis.set(redisString(instanceId, personId), parsed);
	return parsed;
}

export async function create({
	instanceId,
	body,
	t
}: {
	instanceId: number;
	body: Create;
	t: App.Localization;
}) {
	const parsed = parse(createSchema, body);
	await personExists({ instanceId, personId: parsed.person_id, t });
	await adminExists({ instanceId, adminId: parsed.admin_id, t });
	const result = await db
		.insert('people.interactions', { instance_id: instanceId, ...parsed })
		.run(pool);
	const output = await db
		.selectExactlyOne(
			'people.interactions',
			{ id: result.id },
			{
				lateral: {
					admin: db.selectExactlyOne('admins', { id: db.parent('admin_id') })
				}
			}
		)
		.run(pool);
	const parsedOut = parse(listSchema.item, output);
	await redis.del(personRedisString(instanceId, parsed.person_id));
	await redis.del(redisString(instanceId, parsed.person_id));
	return parsedOut;
}

export async function queue({
	instanceId,
	personId,
	adminId,
	details,
	queue
}: {
	instanceId: number;
	personId: number;
	adminId: number;
	details: Create['details'];
	queue: App.Queue;
}): Promise<void> {
	await queue(
		'/utils/people/record_interaction',
		instanceId,
		{ person_id: personId, admin_id: adminId, details },
		adminId
	);
}
