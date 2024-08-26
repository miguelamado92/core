import { apiClient } from '$lib/server/utils/whapi/apiClient';
import { v } from '$lib/schema/valibot';

const linkWhatsappGroupReturnSchema = v.object({
	group_id: v.string()
});

export async function linkWhatsappGroup(inviteCode: string): Promise<string> {
	const result = await apiClient({
		method: 'PUT',
		endpoint: '/groups',
		data: {
			invite_code: inviteCode
		}
	});
	const parsed = v.parse(linkWhatsappGroupReturnSchema, result);
	return parsed.group_id;
}
