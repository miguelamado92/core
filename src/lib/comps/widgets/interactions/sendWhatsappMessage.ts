import { type Read, read } from '$lib/schema/communications/whatsapp/messages';
import { parse, renderValiError } from '$lib/schema/valibot';
export default async function (text: string, personId: number, adminId: number): Promise<void> {
	const body = {
		details: { message: text },
		admin_id: adminId,
		person_id: personId
	};
	const response = await fetch(`/api/v1/people/${personId}/communication/whatsapp/send_message`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (response.ok) {
		return;
	} else {
		const output = await response.json();
		const error = renderValiError(output);
		throw new Error(error.isValiError ? error.message : output.error || 'Error');
	}
}
