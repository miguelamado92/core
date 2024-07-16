import { v, mediumString, uuid } from '$lib/schema/valibot';
import { message } from '$lib/schema/communications/whatsapp/elements/message';

export const contact = v.object({
	wa_id: mediumString,
	profile: v.object({
		name: mediumString
	})
});

export const error = v.object({
	code: v.pipe(v.number(), v.integer()),
	title: mediumString,
	message: mediumString,
	error_data: v.object({
		details: mediumString
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
	biv_opaque_callback_data: uuid,
	conversation: v.object({
		id: mediumString,
		origin: v.object({
			type: conversation_category,
			expiration_timestamp: v.optional(v.pipe(v.number(), v.integer()))
		})
	}),
	errors: v.array(error),
	id: mediumString,
	pricing: v.object({
		category: conversation_category,
		pricing_model: v.literal('CBP')
	}),
	recipient_id: mediumString,
	status: v.picklist(['sent', 'delivered', 'read']),
	timestamp: v.pipe(v.number(), v.integer())
});

export const webhook = v.object({
	object: v.literal('whatsapp_business_account'),
	entry: v.array(
		v.object({
			id: mediumString, //WHATSAPP_BUSINESS_ACCOUNT_ID
			changes: v.array(
				v.object({
					field: v.literal('messages'),
					values: v.object({
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
