import { v, id, mediumString, timestamp, uuid, language, shortString } from '$lib/schema/valibot';
import { DEFAULT_LANGUAGE } from '$lib/schema/valibot';
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
	whatsapp_name: mediumString,
	whatsapp_id: v.nullable(mediumString),
	language: language, //make sure this isn't cuasing problems if whatsapp has (eg: en-US) and we have (eg: en)
	message: template, //this is the template that doesn't have params
	status: whatsappTemplateStatus,
	created_at: timestamp,
	updated_at: timestamp
});

export const read = v.omit(base, ['instance_id']);
export type Read = v.InferOutput<typeof read>;

export const list = v.array(v.omit(base, ['instance_id', 'message']));
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	whatsapp_name: base.entries.whatsapp_name,
	name: base.entries.name,
	language: v.optional(base.entries.language, DEFAULT_LANGUAGE),
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
