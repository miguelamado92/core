import { db, pool, redis, BelcodaError, filterQuery } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/website/templates';

function redisString(instanceId: number, templateId: number | 'all') {
	return `i:${instanceId}:templates:${templateId}`;
}

export async function create({
	instanceId,
	body
}: {
	instanceId: number;
	body: schema.CreateInput;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const result = await db
		.insert('website.templates', { instance_id: instanceId, ...parsed })
		.run(pool);
	const parsedResult = parse(schema.read, result);
	await redis.del(redisString(instanceId, 'all'));
	await redis.set(redisString(instanceId, parsedResult.id), parsedResult);
	return parsedResult;
}

export async function read({
	instanceId,
	templateId,
	t
}: {
	instanceId: number;
	templateId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, templateId));
	if (cached) {
		return parse(schema.read, cached);
	}
	const result = await db
		.selectExactlyOne('website.templates', { instance_id: instanceId, id: templateId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:WEBSITE:TEMPLATES:READ:01', t.errors.not_found(), err);
		});
	const parsedResult = parse(schema.read, result);
	await redis.set(redisString(instanceId, templateId), parsedResult);
	return parsedResult;
}

export async function list({
	instanceId,
	url
}: {
	instanceId: number;
	url: URL;
}): Promise<schema.List> {
	const filter = filterQuery(url);
	if (filter.filtered !== true) {
		const cached = await redis.get(redisString(instanceId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	const result = await db
		.select('website.templates', { instance_id: instanceId, ...filter.where }, filter.options)
		.run(pool);
	const count = await db
		.count('website.templates', { instance_id: instanceId, ...filter.where })
		.run(pool);
	const parsedResult = parse(schema.list, { count: count, items: result });
	if (filter.filtered !== true) await redis.set(redisString(instanceId, 'all'), parsedResult);
	return parsedResult;
}

export async function update({
	instanceId,
	templateId,
	body,
	t
}: {
	instanceId: number;
	templateId: number;
	body: schema.Update;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	const result = await db
		.update('website.templates', parsed, { instance_id: instanceId, id: templateId })
		.run(pool);
	if (result.length !== 1) {
		throw new BelcodaError(404, 'DATA:WEBSITE:TEMPLATES:UPDATE:01', t.errors.not_found());
	}
	const parsedResult = parse(schema.read, result[0]);
	await redis.set(redisString(instanceId, templateId), parsedResult);
	await redis.del(redisString(instanceId, 'all'));
	return parsedResult;
}
