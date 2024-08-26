import { v } from '$lib/schema/valibot';
import { message } from '$lib/schema/communications/whatsapp/whapi/incoming/messages';
export const incomingWebhook = v.object({
	event: v.object({
		type: v.string(),
		event: v.string()
	}),
	messages: v.optional(v.array(message))
});
export type IncomingWebhook = v.InferOutput<typeof incomingWebhook>;
