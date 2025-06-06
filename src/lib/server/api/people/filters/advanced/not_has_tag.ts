import { format } from 'node-pg-format';
export function filter({ instanceId, tagId }: { instanceId: number; tagId: number }) {
	const query = format(
		`(SELECT id FROM people.people WHERE instance_id = %L AND deleted_at IS NULL AND id NOT IN (select person_id from people.taggings where tag_id = %L))`,
		instanceId,
		tagId
	);

	return query;
}
