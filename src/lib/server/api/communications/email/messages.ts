import { db, pool, redis, filterQuery, BelcodaError } from '$lib/server';
import * as schema from '$lib/schema/communications/email/messages';
import { parse } from '$lib/schema/valibot';

function redisString(instanceId: number, messageId: number | 'all') {
	return `i:${instanceId}:email_messages:${messageId}`;
}

export async function exists({
	instanceId,
	messageId,
	t
}: {
	instanceId: number;
	messageId: number;
	t: App.Localization;
}): Promise<true> {
	const cached = await redis.get(redisString(instanceId, messageId));
	if (cached) {
		return true;
	}
	await db
		.selectExactlyOne('communications.email_messages', { id: messageId, instance_id: instanceId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:COMMUNICATIONS:EMAIL:MESSAGES:EXISTS:01',
				t.errors.not_found(),
				err
			);
		});
	return true;
}

export async function create({
	instanceId,
	defaultTemplateId,
	body
}: {
	instanceId: number;
	defaultTemplateId: number;
	body: schema.Create;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const toInsert = {
		instance_id: instanceId,
		template_id: parsed.template_id || defaultTemplateId,
		...parsed
	};
	const inserted = await db.insert('communications.email_messages', toInsert).run(pool);
	const parsedInserted = parse(schema.read, inserted);
	await redis.del(redisString(instanceId, 'all'));
	await redis.set(redisString(instanceId, parsedInserted.id), parsedInserted);
	return parsedInserted;
}

export async function update({
	instanceId,
	messageId,
	body,
	t
}: {
	instanceId: number;
	messageId: number;
	body: schema.Update;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	const toUpdate = {
		...parsed
	};
	const updated = await db
		.update('communications.email_messages', toUpdate, { id: messageId, instance_id: instanceId })
		.run(pool);
	if (updated.length !== 1) {
		throw new BelcodaError(
			404,
			'DATA:COMMUNICATIONS:EMAIL:MESSAGES:UPDATE:01',
			t.errors.not_found()
		);
	}
	const parsedUpdated = parse(schema.read, updated[0]);
	await redis.del(redisString(instanceId, 'all'));
	await redis.set(redisString(instanceId, parsedUpdated.id), parsedUpdated);
	return parsedUpdated;
}

export async function read({
	instanceId,
	messageId,
	t
}: {
	instanceId: number;
	messageId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, messageId));
	if (cached) {
		return parse(schema.read, cached);
	}
	const read = await db
		.selectExactlyOne('communications.email_messages', { id: messageId, instance_id: instanceId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:COMMUNICATIONS:EMAIL:MESSAGES:READ:01',
				t.errors.not_found(),
				err
			);
		});
	const parsedRead = parse(schema.read, read);
	await redis.set(redisString(instanceId, parsedRead.id), parsedRead);
	return parsedRead;
}

export async function list({
	instanceId,
	url,
	t
}: {
	instanceId: number;
	url: URL;
	t: App.Localization;
}): Promise<schema.List> {
	const query = filterQuery(url);
	if (query.filtered !== true) {
		const cached = await redis.get(redisString(instanceId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	const list = await db
		.select(
			'communications.email_messages',
			{ instance_id: instanceId, ...query.where },
			query.options
		)
		.run(pool);
	const parsedList = parse(schema.list, list);
	await redis.set(redisString(instanceId, 'all'), parsedList);
	return parsedList;
}
