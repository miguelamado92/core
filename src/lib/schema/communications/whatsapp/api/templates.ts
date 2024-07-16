import { v, mediumString } from '$lib/schema/valibot';
import { template as template_element } from '$lib/schema/communications/whatsapp/elements/template';

export const create = v.object({
	name: v.pipe(v.string(), v.maxLength(512)),
	category: v.picklist(['MARKETING', 'UTILITY']),
	allow_category_change: v.optional(v.boolean(), true),
	components: template_element.entries.components
});

export const response = v.object({
	id: mediumString,
	status: v.picklist(['ACCEPTED', 'PENDING', 'REJECTED']),
	category: v.picklist(['MARKETING', 'UTILITY'])
});

export const update = v.partial(v.pick(create, ['category', 'components']));
