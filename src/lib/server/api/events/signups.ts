import { db, pool, redis, BelcodaError, filterQuery } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/events/signups';
import { exists } from '$lib/server/api/events/events';
import { exists as personExists } from '$lib/server/api/people/people';
export async function create({
	instanceId,
	eventId,
	body,
	t
}: {
	instanceId: number;
	eventId: number;
	body: schema.Create;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	await exists({ instanceId, eventId, t });
	const result = await db.insert('events.signups', { event_id: eventId, ...parsed }).run(pool);
	const parsedResult = parse(schema.read, result);
	return parsedResult;
}

export async function update({
	instanceId,
	eventId,
	personId,
	body,
	t
}: {
	instanceId: number;
	eventId: number;
	personId: number;
	body: schema.Update;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	await exists({ instanceId, eventId, t });
	const result = await db
		.update('events.signups', parsed, { event_id: eventId, person_id: personId })
		.run(pool);
	if (result.length !== 1)
		throw new BelcodaError(404, 'DATA:EVENTS:SIGNUPS:UPDATE:01', t.errors.not_found());
	const parsedResult = parse(schema.read, result);
	return parsedResult;
}

export async function listForPerson({
	instanceId,
	personId,
	t
}: {
	instanceId: number;
	personId: number;
	t: App.Localization;
}): Promise<schema.List> {
	await personExists({ instanceId, personId, t });
	const results = await db.select('events.signups', { person_id: personId }).run(pool);
	return parse(schema.list, results);
}
