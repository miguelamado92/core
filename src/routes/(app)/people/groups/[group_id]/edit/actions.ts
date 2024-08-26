import { parse } from '$lib/schema/valibot';
import { read } from '$lib/schema/people/groups';

export async function linkWhatsappGroup(groupId: number, inviteCode: string) {
	const response = await fetch(`/api/v1/people/groups/${groupId}/whatsapp/link`, {
		method: 'PUT',
		body: JSON.stringify({
			invitation_code: inviteCode
		})
	});
	if (!response.ok) {
		const body = await response.json();
		console.error(body);
		throw new Error(`[${response.status}] Unable to link WhatsApp group`);
	} else {
		const body = await response.json();
		return parse(read, body);
	}
}
