import { apiClient } from '$lib/server/utils/whapi/apiClient';
import { v } from '$lib/schema/valibot';

export const contactMetadata = v.partial(
	v.object({
		id: v.string(),
		name: v.string(),
		pushname: v.string(),
		is_business: v.boolean(),
		profile_pic: v.string(),
		profile_pic_full: v.string(),
		status: v.string()
	})
);
export type ContactMetadata = v.InferOutput<typeof contactMetadata>;

export const checkContactResponseTypes = {
	valid: v.object({
		input: v.string(),
		status: v.literal('valid'),
		wa_id: v.string()
	}),
	invalid: v.object({
		input: v.string(),
		status: v.literal('invalid')
	})
};

export const checkContactResponse = v.object({
	contacts: v.array(
		v.variant('status', [checkContactResponseTypes.valid, checkContactResponseTypes.invalid])
	)
});
export type CheckContactResponse = v.InferOutput<typeof checkContactResponse>;

export async function checkContact(internationallyFormattedPhoneNumber: string) {
	const result = await apiClient({
		method: 'POST',
		endpoint: '/contacts',
		data: {
			blocking: 'wait',
			contacts: [internationallyFormattedPhoneNumber]
		}
	});
	const parsed = v.parse(checkContactResponse, result);
	return parsed.contacts[0];
}

export async function getContactMetadata(contactId: string): Promise<ContactMetadata> {
	const result = await apiClient({
		method: 'GET',
		endpoint: `/contacts/${contactId.replace('@s.whatsapp.net', '')}`
	});

	const parsed = v.parse(contactMetadata, result);
	return parsed;
}
