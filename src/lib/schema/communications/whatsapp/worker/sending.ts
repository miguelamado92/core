import { v, id, uuid } from '$lib/schema/valibot';
import {
	successfulYCloudResponse,
	message
} from '$lib/schema/communications/whatsapp/elements/message';
export const afterSend = v.object({
	message_id: uuid,
	sent_by_id: id,
	person_id: id,
	message: message,
	uniqueId: uuid,
	whatsapp_response: successfulYCloudResponse
});
export type AfterSend = v.InferOutput<typeof afterSend>;
