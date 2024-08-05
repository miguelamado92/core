import { db, pool, redis, filterQuery, BelcodaError } from '$lib/server';
import * as schema from '$lib/schema/communications/whatsapp/sends';
import { parse } from '$lib/schema/valibot';

function redisString(instanceId: number, threadId: number, sendId: number | 'all') {
	return `i:${instanceId}:whatsapp_threads:${threadId}:sends:${sendId}`;
}

export async function create({
	instanceId,
	threadId,
	adminId,
	queue,
	body
}: {
	instanceId: number;
	threadId: number;
	queue: App.Queue;
	adminId: number;
	body: schema.Create;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const toInsert = {
		sent_by_id: adminId,
		thread_id: threadId,
		...parsed
	};
	const inserted = await db.insert('communications.whatsapp_sends', toInsert).run(pool);
	const parsedInserted = parse(schema.read, inserted);
	await redis.del(redisString(instanceId, threadId, 'all'));
	await redis.set(redisString(instanceId, threadId, parsedInserted.id), parsedInserted);
	await queue('/whatsapp/send_thread', instanceId, parsedInserted, adminId);
	return parsedInserted;
}

export async function read({
	instanceId,
	threadId,
	sendId,
	t
}: {
	instanceId: number;
	threadId: number;
	sendId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, threadId, sendId));
	if (cached) {
		return parse(schema.read, cached);
	}
	const selected = await db
		.selectExactlyOne('communications.whatsapp_sends', { id: sendId, thread_id: threadId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:COMMUNICATIONS:WHATSAPP:SENDS:READ:01',
				t.errors.not_found(),
				err
			);
		});
	await redis.set(redisString(instanceId, threadId, sendId), selected);
	return parse(schema.read, selected);
}

export async function listForThread({
	instanceId,
	threadId,
	t,
	url
}: {
	instanceId: number;
	threadId: number;
	t: App.Localization;
	url: URL;
}): Promise<schema.List> {
	const query = filterQuery(url);
	if (query.filtered !== true) {
		const cached = await redis.get(redisString(instanceId, threadId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	const selected = await db
		.select(
			'communications.whatsapp_sends',
			{ thread_id: threadId },
			{
				limit: query.options.limit,
				offset: query.options.offset,
				order: {
					by: 'started_at',
					direction: 'DESC'
				}
			}
		)
		.run(pool);
	const count = await db.count('communications.whatsapp_sends', { thread_id: threadId }).run(pool);
	const parsedSelected = parse(schema.list, { items: selected, count: count });
	if (!query.filtered) await redis.set(redisString(instanceId, threadId, 'all'), parsedSelected);
	return parsedSelected;
}
