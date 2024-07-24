import { db, pool, redis, filterQuery, BelcodaError } from '$lib/server';
import { parse } from '$lib/schema/valibot';

import * as schema from '$lib/schema/communications/whatsapp/messages';

function redisString(instanceId: number, threadId: number, msgId: string | 'all') {
	return `i:${instanceId}:wa_thread:${threadId}:msg:${msgId}`;
}

export async function create({
	instanceId,
	threadId,
	body
}: {
	instanceId: number;
	threadId: number;
	body: schema.Create;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const result = await db
		.insert('communications.whatsapp_messages', { thread_id: threadId, ...parsed })
		.run(pool);
	const parsedResult = parse(schema.read, result);
	await redis.del(redisString(instanceId, threadId, 'all'));
	await redis.set(redisString(instanceId, threadId, parsedResult.id), parsedResult);
	return parsedResult;
}

export async function read({
	instanceId,
	threadId,
	messageId,
	t
}: {
	instanceId: number;
	threadId: number;
	messageId: string;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, threadId, messageId));
	if (cached) {
		return parse(schema.read, cached);
	}
	const result = await db
		.selectExactlyOne('communications.whatsapp_messages', { thread_id: threadId, id: messageId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:COMMUNICATIONS:WHATSAPP:MESSAGES:READ:01',
				t.errors.not_found(),
				err
			);
		});
	const parsedResult = parse(schema.read, result);
	await redis.set(redisString(instanceId, threadId, messageId), parsedResult);
	return parsedResult;
}

export async function list({
	instanceId,
	threadId,
	url
}: {
	instanceId: number;
	threadId: number;
	url: URL;
}): Promise<schema.List> {
	const { filtered, options, where } = filterQuery(url);
	if (!filtered) {
		const cached = await redis.get(redisString(instanceId, threadId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	const result = await db
		.select('communications.whatsapp_messages', { thread_id: threadId, ...where }, options)
		.run(pool);
	const count = await db
		.count('communications.whatsapp_messages', { thread_id: threadId, ...where })
		.run(pool);
	const parsedResult = parse(schema.list, { items: result, count: count });
	if (!filtered) {
		await redis.set(redisString(instanceId, threadId, 'all'), parsedResult);
	}
	return parsedResult;
}

export async function update({
	instanceId,
	threadId,
	messageId,
	body,
	t
}: {
	instanceId: number;
	threadId: number;
	messageId: string;
	body: schema.Update;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	const result = await db
		.update('communications.whatsapp_messages', parsed, { thread_id: threadId, id: messageId })
		.run(pool);
	if (result.length !== 1) {
		throw new BelcodaError(
			404,
			'DATA:COMMUNICATIONS:WHATSAPP:MESSAGES:READ:01',
			t.errors.not_found()
		);
	}
	const parsedResult = parse(schema.read, result[0]);
	await redis.del(redisString(instanceId, threadId, 'all'));
	await redis.set(redisString(instanceId, threadId, parsedResult.id), parsedResult);
	return parsedResult;
}
