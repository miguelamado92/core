import { filterQuery, db, pool } from '$lib/server';
import { parse } from '$lib/schema/valibot';
import * as schema from '$lib/schema/people/people';
import * as groupSchema from '$lib/schema/people/groups';
import { exists } from '$lib/server/api/people/groups';
export async function list({
	instance_id,
	url,
	groupId,
	t,
	notPaged
}: {
	instance_id: number;
	url: URL;
	groupId: number;
	t: App.Localization;
	notPaged?: boolean;
}): Promise<schema.List> {
	await exists({ instanceId: instance_id, groupId, t });
	const query = filterQuery(url, { search_key: 'full_name', notPaged });
	const selected = await db
		.select(
			'people.group_members',
			{ group_id: groupId, status: db.conditions.isNotIn(['banned']) },
			{
				lateral: {
					person: db.selectExactlyOne(
						'people.people',
						{ id: db.parent('person_id'), instance_id, ...query.where },
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
				}
			}
		)
		.run(pool);
	const count = await db
		.count(
			'people.group_members',
			{ group_id: groupId },
			{
				lateral: {
					person: db.selectExactlyOne('people.people', {
						id: db.parent('person_id'),
						instance_id,
						...query.where
					})
				}
			}
		)
		.run(pool);
	const mapped = selected.map((row) => {
		return { status: row.status, ...row.person };
	});
	const listOfPeople = parse(groupSchema.read.entries.members, mapped);
	const parsed = { items: listOfPeople, count: count };
	return parsed;
}
