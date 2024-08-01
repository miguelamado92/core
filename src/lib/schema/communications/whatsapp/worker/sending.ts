import { v, id, uuid } from '$lib/schema/valibot';
import { successfulResponse, message } from '$lib/schema/communications/whatsapp/elements/message';
export const afterSendMessage = v.object({
	message_id: uuid,
	sent_by_id: id,
	person_id: id,
	message: message,
	whatsapp_response: successfulResponse
});
export const afterSendThread = v.object({
	thread_id: id,
	sent_by_id: id,
	person_id: id,
	message: message,
	whatsapp_response: successfulResponse
});
export const afterSend = v.union([afterSendMessage, afterSendThread]);
export type AfterSend = v.InferOutput<typeof afterSend>;
