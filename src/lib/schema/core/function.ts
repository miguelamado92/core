import { v, id, shortString, mediumString, timestamp } from '$lib/schema/valibot';

import { functionStep } from '$lib/schema/core/functions/steps';

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	run_as: id,
	description: v.nullable(mediumString),
	steps: v.array(functionStep),
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);

export const list = v.array(v.omit(base, ['instance_id', 'run_as', 'steps', 'description']));

export const create = v.pick(base, ['name']);

export const update = v.partial(v.pick(base, ['name', 'description', 'steps', 'run_as']));
