import { v, mediumString, uuid } from '$lib/schema/valibot';
import { message, error } from '$lib/schema/communications/whatsapp/webhooks/messages';

export const contact = v.object({
	wa_id: mediumString,
	profile: v.object({
		name: mediumString
	})
});

export const conversation_category = v.picklist([
	'authentication',
	'marketing',
	'utility',
	'service',
	'referral_conversion'
]);

export const metadata = v.object({
	display_phone_number: mediumString,
	phone_number_id: mediumString
});

export const status = v.object({
	id: mediumString,
	status: v.picklist(['sent', 'delivered', 'read']),
	timestamp: v.pipe(
		v.union([v.string(), v.number()]),
		v.transform((input) => Number(input)),
		v.number(),
		v.integer()
	),
	recipient_id: mediumString,
	biz_opaque_callback_data: v.optional(uuid),
	conversation: v.optional(
		v.object({
			id: mediumString,
			origin: v.object({
				type: conversation_category
			}),
			expiration_timestamp: v.optional(
				v.pipe(
					v.union([v.string(), v.number()]),
					v.transform((input) => Number(input)),
					v.number(),
					v.integer()
				)
			)
		})
	),
	errors: v.optional(v.array(error)),
	pricing: v.optional(
		v.object({
			pricing: v.optional(v.boolean(), true),
			category: conversation_category,
			pricing_model: v.literal('CBP')
		})
	)
});

export const webhook = v.object({
	object: v.literal('whatsapp_business_account'),
	entry: v.array(
		v.object({
			id: mediumString, //WHATSAPP_BUSINESS_ACCOUNT_ID
			changes: v.array(
				v.object({
					field: v.literal('messages'),
					value: v.object({
						contacts: v.optional(v.array(contact)),
						errors: v.optional(v.array(error)),
						messaging_product: v.literal('whatsapp'),
						messages: v.optional(v.array(message)),
						metadata: metadata,
						statuses: v.optional(v.array(status))
					})
				})
			)
		})
	)
});
export type Webhook = v.InferOutput<typeof webhook>;
