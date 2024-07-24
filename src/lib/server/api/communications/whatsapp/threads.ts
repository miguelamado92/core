import { db, pool, redis, filterQuery, BelcodaError } from '$lib/server';
import { parse } from '$lib/schema/valibot';

import * as schema from '$lib/schema/communications/whatsapp/threads';

function redisString(instanceId: number, templateId: number | 'all') {
	return `i:${instanceId}:whatsapp_threads:${templateId}`;
}

export async function exists({
	instanceId,
	threadId,
	t
}: {
	instanceId: number;
	threadId: number;
	t: App.Localization;
}): Promise<boolean> {
	const cached = await redis.get(redisString(instanceId, threadId));
	if (cached) {
		return true;
	}
	await db
		.selectExactlyOne('communications.whatsapp_threads', { instance_id: instanceId, id: threadId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:COMMUNICATIONS:WHATSAPP:THREADS:EXISTS:01',
				t.errors.not_found(),
				err
			);
		});
	return true;
}

export async function create({
	instanceId,
	body
}: {
	instanceId: number;
	body: schema.Create;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const result = await db
		.insert('communications.whatsapp_threads', { instance_id: instanceId, ...parsed })
		.run(pool);
	const parsedResult = parse(schema.read, result);
	await redis.del(redisString(instanceId, 'all'));
	await redis.set(redisString(instanceId, parsedResult.id), parsedResult);
	return parsedResult;
}

export async function read({
	instanceId,
	threadId,
	t
}: {
	instanceId: number;
	threadId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, threadId));
	if (cached) {
		return parse(schema.read, cached);
	}
	const result = await db
		.selectExactlyOne('communications.whatsapp_threads', { instance_id: instanceId, id: threadId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:COMMUNICATIONS:WHATSAPP:THREADS:READ:01',
				t.errors.not_found(),
				err
			);
		});
	const parsedResult = parse(schema.read, result);
	await redis.set(redisString(instanceId, threadId), parsedResult);
	return parsedResult;
}

export async function list({
	instanceId,
	url
}: {
	instanceId: number;
	url: URL;
}): Promise<schema.List> {
	const { filtered, where, options } = filterQuery(url);
	if (!filtered) {
		const cached = await redis.get(redisString(instanceId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	const result = await db
		.select('communications.whatsapp_threads', { instance_id: instanceId, ...where }, options)
		.run(pool);
	const count = await db
		.count('communications.whatsapp_threads', { instance_id: instanceId, ...where })
		.run(pool);
	const parsedResult = parse(schema.list, { items: result, count: count });
	if (!filtered) {
		await redis.set(redisString(instanceId, 'all'), parsedResult);
	}
	return parsedResult;
}

export async function update({
	instanceId,
	threadId,
	body,
	t
}: {
	instanceId: number;
	threadId: number;
	body: schema.Update;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	const result = await db
		.update('communications.whatsapp_threads', { instance_id: instanceId, id: threadId }, parsed)
		.run(pool);
	if (result.length !== 1) {
		throw new BelcodaError(
			404,
			'DATA:COMMUNICATIONS:WHATSAPP:THREADS:UPDATE:01',
			t.errors.not_found()
		);
	}
	const parsedResult = parse(schema.read, result);
	await redis.del(redisString(instanceId, 'all'));
	await redis.set(redisString(instanceId, threadId), parsedResult);
	return parsedResult;
}
