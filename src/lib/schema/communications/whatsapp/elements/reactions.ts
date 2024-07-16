import { v, longString } from '$lib/schema/valibot';
export const emoji = v.object({
	message_id: v.string(),
	emoji: v.pipe(v.string(), v.length(1), v.emoji())
});

export const context = v.object({
	message_id: longString
});
