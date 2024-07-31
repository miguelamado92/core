import {
	v,
	id,
	mediumString,
	timestamp,
	count,
	language,
	shortString,
	DEFAULT_LANGUAGE
} from '$lib/schema/valibot';
import { template } from '$lib/schema/communications/whatsapp/elements/template';

export const whatsappTemplateStatus = v.picklist([
	'CREATED',
	'APPROVED',
	'REJECTED',
	'PENDING',
	'PAUSED'
]);

export const base = v.object({
	id: id,
	instance_id: id,
	name: shortString,
	whatsapp_id: v.nullable(mediumString),
	interactive: v.boolean(),
	message: template, //this is the template that doesn't have para
	status: whatsappTemplateStatus,
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.object({
	items: v.array(v.omit(base, ['instance_id'])),
	count: count
});
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	name: base.entries.name,
	message: base.entries.message,
	status: v.optional(base.entries.status, 'CREATED')
});
export type Create = v.InferOutput<typeof create>;

export const update = v.partial(
	v.object({
		whatsapp_id: base.entries.whatsapp_id,
		...create.entries
	})
);
export type Update = v.InferOutput<typeof update>;
