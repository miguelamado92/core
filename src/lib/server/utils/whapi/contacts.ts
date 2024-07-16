import { apiClient } from '$lib/server/utils/whapi/apiClient';
import { v } from '$lib/schema/valibot';
export async function getContacts() {
	return await apiClient({
		method: 'GET',
		endpoint: '/contacts',
		data: {}
	});
}

const checkContactSchema = v.object({});

export async function checkContact(internationallyFormattedPhoneNumber: string) {
	const result = await apiClient({
		method: 'POST',
		endpoint: '/contacts',
		data: {
			blocking: 'wait',
			contacts: [internationallyFormattedPhoneNumber]
		}
	});
}
