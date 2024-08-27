import { db, pool, redis, type s, BelcodaError, filterQuery, pino } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/petitions/petitions';
import type { Read as ReadInstance } from '$lib/schema/core/instance';

import { randomUUID } from 'crypto';

import htmlEmail from '$lib/utils/templates/email/petitions/petition_autoresponse_html.handlebars?raw';
import textEmail from '$lib/utils/templates/email/petitions/petition_autoresponse_text.handlebars?raw';

import { read as readInstance } from '$lib/server/api/core/instances';
import { create as createEmailMessage } from '$lib/server/api/communications/email/messages';

export function redisString(instanceId: number, petitionId: number | 'all') {
	return `i:${instanceId}:petitions:${petitionId}`;
}
export function redisStringSlug(instanceId: number, slug: string) {
	return `i:${instanceId}:petitionslug:${slug}`;
}

export async function exists({
	instanceId,
	petitionId,
	t
}: {
	instanceId: number;
	petitionId: number;
	t: App.Localization;
}): Promise<boolean> {
	const cached = await redis.get(redisString(instanceId, petitionId));
	if (cached) {
		return true;
	}
	await db
		.selectExactlyOne('petitions.petitions', { instance_id: instanceId, id: petitionId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:PETITIONS:PETITIONS:EXISTS:01', t.errors.not_found(), err);
		});
	return true;
}

export async function create({
	instanceId,
	adminId,
	body,
	t
}: {
	instanceId: number;
	adminId: number;
	body: schema.Create;
	t: App.Localization;
}): Promise<schema.Read> {
	const parsed = parse(schema.create, body);
	const instance = await readInstance({ instance_id: instanceId });
	const emailMessage = await createPetitionEmail({
		body: parsed,
		instanceId,
		adminId,
		instance,
		defaultEmailTemplateId: instance.settings.communications.email.default_template_id
	});
	const inserted = await db
		.insert('petitions.petitions', {
			instance_id: instanceId,
			point_person_id: adminId,
			autoresponse_email: emailMessage,
			template_id: instance.settings.petitions.default_template_id,
			...parsed
		})
		.run(pool);
	await redis.del(redisString(instanceId, adminId));
	await redis.del(redisString(instanceId, 'all'));
	const returned = await read({ instanceId, petitionId: inserted.id, t: t });
	return returned;
}

export async function update({
	instanceId,
	t,
	petitionId,
	body
}: {
	instanceId: number;
	t: App.Localization;
	petitionId: number;
	body: schema.Update;
}): Promise<schema.Read> {
	const parsed = parse(schema.update, body);
	const updated = await db
		.update('petitions.petitions', parsed, { instance_id: instanceId, id: petitionId })
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:PETITIONS:PETITIONS:UPDATE:01', t.errors.not_found(), err);
		});
	if (updated.length !== 1)
		throw new BelcodaError(404, 'DATA:PETITIONS:PETITIONS:UPDATE:02', t.errors.not_found());
	await redis.del(redisString(instanceId, 'all'));
	await redis.del(redisString(instanceId, petitionId));
	const returned = await read({ instanceId, petitionId: petitionId, t: t });
	return returned;
}

export async function read({
	instanceId,
	petitionId,
	t
}: {
	instanceId: number;
	petitionId: number;
	t: App.Localization;
}): Promise<schema.Read> {
	const cached = await redis.get(redisString(instanceId, petitionId));
	if (cached) {
		return parse(schema.read, cached);
	}
	const result = await db
		.selectExactlyOne(
			'petitions.petitions',
			{ instance_id: instanceId, id: petitionId },
			{
				lateral: {
					feature_image: db.selectOne('website.uploads', {
						id: db.parent('feature_image_upload_id')
					}),
					point_person: db.selectExactlyOne('admins', { id: db.parent('point_person_id') }),
					autoresponse_email: db.selectExactlyOne('communications.email_messages', {
						id: db.parent('autoresponse_email')
					}),
					signatures: db.count('petitions.signatures', {
						petition_id: db.parent('id')
					})
				}
			}
		)
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(404, 'DATA:EVENTS:READ:01', t.errors.not_found(), err);
		});
	const parsedResult = parse(schema.read, result);
	await redis.set(redisString(instanceId, petitionId), parsedResult);
	return parsedResult;
}

export async function readBySlug({
	instanceId,
	slug
}: {
	instanceId: number;
	slug: string;
}): Promise<schema.Read> {
	const cached = await redis.get(redisStringSlug(instanceId, slug));
	if (cached) {
		return parse(schema.read, cached);
	}
	const result = await db
		.selectExactlyOne(
			'petitions.petitions',
			{ instance_id: instanceId, slug },
			{
				lateral: {
					signatures: db.count('petitions.signatures', { petition_id: db.parent('id') }),
					autoresponse_email: db.selectExactlyOne('communications.email_messages', {
						id: db.parent('autoresponse_email')
					}),
					point_person: db.selectExactlyOne('admins', { id: db.parent('point_person_id') })
				}
			}
		)
		.run(pool)
		.catch((err) => {
			throw new BelcodaError(
				404,
				'DATA:PETITIONS:PETITIONS:READBYSLUG:01',
				'Petition not found',
				err
			);
		});
	const parsedResult = parse(schema.read, result);
	await redis.set(redisStringSlug(instanceId, slug), parsedResult);
	return parsedResult;
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
	const filter = filterQuery(url);
	if (filter.filtered !== true) {
		const cached = await redis.get(redisString(instanceId, 'all'));
		if (cached) {
			return parse(schema.list, cached);
		}
	}
	const result = await db
		.select(
			'petitions.petitions',
			{ instance_id: instanceId, ...filter.where },
			{
				lateral: {
					point_person: db.selectExactlyOne('admins', { id: db.parent('point_person_id') }),
					signatures: db.count('petitions.signatures', {
						petition_id: db.parent('id')
					})
				},
				...filter.options
			}
		)
		.run(pool);
	const count = await db
		.count('petitions.petitions', { instance_id: instanceId, ...filter.where })
		.run(pool);
	const parsedResult = parse(schema.list, { items: result, count: count });

	if (filter.filtered !== true) {
		await redis.set(redisString(instanceId, 'all'), parsedResult);
	}
	return parsedResult;
}

/// Helper functions

async function createPetitionEmail({
	body,
	instanceId,
	adminId,
	instance,
	defaultEmailTemplateId
}: {
	body: schema.Create;
	instanceId: number;
	adminId: number;
	instance: ReadInstance;
	defaultEmailTemplateId: number;
}): Promise<number> {
	const registrationEmail = await createEmailMessage({
		instanceId,
		body: {
			name: randomUUID(),
			point_person_id: adminId,
			from: `${instance.name} <${instance.slug}@belcoda.com>`,
			reply_to: `${instance.slug}@belcoda.com`,
			subject: `${body.heading}`,
			html: htmlEmail,
			text: textEmail,
			preview_text: `Thank you for signing {{petition.heading}}`,
			use_html_for_plaintext: true,
			template_id: defaultEmailTemplateId
		},
		defaultTemplateId: defaultEmailTemplateId
	});
	return registrationEmail.id;
}
