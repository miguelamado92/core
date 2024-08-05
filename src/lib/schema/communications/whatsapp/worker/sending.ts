import { v, id, uuid } from '$lib/schema/valibot';
import { successfulResponse, message } from '$lib/schema/communications/whatsapp/elements/message';
export const afterSend = v.object({
	message_id: uuid,
	sent_by_id: id,
	person_id: id,
	message: message,
	whatsapp_response: successfulResponse
});
export type AfterSend = v.InferOutput<typeof afterSend>;
