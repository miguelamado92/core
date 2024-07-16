import { db, pool, redis, BelcodaError, filterQuery } from '$lib/server';
import { parse, id } from '$lib/schema/valibot';
import * as schema from '$lib/schema/website/content';
import { read as readContentType, exists } from '$lib/server/api/website/content_types';

function redisString(instanceId: number, contentTypeId: number, contentId: number | 'all') {
	return `i:${instanceId}:content_types:${contentTypeId}:content:${contentId}`;
}

function redisStringSlug(instanceId: number, contentTypeId: number, slug: string) {
	return `i:${instanceId}:content_slug:${contentTypeId}:${slug}`;
}

export async function create({
	instanceId,
	contentTypeId,
	body,
	t
}: {
	instanceId: number;
	contentTypeId: number;
	body: schema.Create;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const contentType = await readContentType({ instanceId, contentTypeId, t });
	const result = await db
		.insert('website.content', {
			content_type_id: contentTypeId,
			template_id: contentType.content_template_id,
			...parsed
		})
		.run(pool);
	const parsedResult = parse(schema.read, result);
	await redis.del(redisString(instanceId, contentTypeId, 'all'));
	await redis.set(redisString(instanceId, contentTypeId, parsedResult.id), parsedResult);
	return parsedResult;
}

export async function read({
	instanceId,
	contentTypeId,
	contentId,
	t
}: {
	instanceId: number;
	contentTypeId: number;
	contentId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, contentTypeId, contentId));
	if (cached) {
		return parse(schema.read, cached);
	}
	await exists({ instanceId, contentTypeId, t });
	const result = await db
		.selectExactlyOne('website.content', { id: contentId, content_type_id: contentTypeId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:WEBSITE:CONTENT:READ:01', t.errors.not_found(), err);
		});
	const parsedResult = parse(schema.read, result);
	await redis.set(redisString(instanceId, contentTypeId, contentId), parsedResult);
	return parsedResult;
}

export async function readBySlug({
	instanceId,
	slug,
	contentTypeId,
	t
}: {
	instanceId: number;
	slug: string;
	contentTypeId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisStringSlug(instanceId, contentTypeId, slug));
	if (cached) {
		const contentId = parse(id, cached);
		return read({ instanceId, contentTypeId, contentId, t });
	}
	const result = await db
		.selectExactlyOne(
			'website.content',
			{ slug, content_type_id: contentTypeId },
			{ columns: ['id'] }
		)
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:WEBSITE:CONTENT:READBYSLUG:01', t.errors.not_found(), err);
		});
	const contentId = parse(id, result.id);
	await redis.set(redisStringSlug(instanceId, contentTypeId, slug), contentId);
	return await read({ instanceId, contentTypeId, contentId, t });
}

export async function list({
	instanceId,
	contentTypeId,
	url,
	t
}: {
	instanceId: number;
	contentTypeId: number;
	url: URL;
	t: App.Localization;
}): Promise<schema.List> {
	const filter = filterQuery(url);
	if (filter.filtered !== true) {
		const cached = await redis.get(redisString(instanceId, contentTypeId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	await exists({ instanceId, contentTypeId, t });
	const result = await db
		.select('website.content', { content_type_id: contentTypeId, ...filter.where }, filter.options)
		.run(pool);

	const count = await db
		.count('website.content', { content_type_id: contentTypeId, ...filter.where })
		.run(pool);
	const parsedResult = parse(schema.list, { count: count, items: result });
	await redis.set(redisString(instanceId, contentTypeId, 'all'), parsedResult);
	return parsedResult;
}

export async function update({
	instanceId,
	contentTypeId,
	contentId,
	body,
	t
}: {
	instanceId: number;
	contentTypeId: number;
	contentId: number;
	t: App.Localization;
	body: schema.Update;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	const result = await db
		.update('website.content', parsed, { id: contentId, content_type_id: contentTypeId })
		.run(pool);
	if (result.length !== 1) {
		throw new BelcodaError(404, 'DATA:WEBSITE:CONTENT:UPDATE:01', t.errors.not_found());
	}
	const parsedResult = parse(schema.read, result[0]);
	await redis.del(redisString(instanceId, contentTypeId, contentId));
	await redis.del(redisString(instanceId, contentTypeId, 'all'));
	return parsedResult;
}
