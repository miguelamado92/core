import { v, id } from '$lib/schema/valibot';

export const htmlMetatagsOptions = {
	event: v.object({
		type: v.literal('event'),
		eventId: id
	})
};
export type EventHTMLMetaTags = v.InferOutput<typeof htmlMetatagsOptions.event>;

export const htmlMetatags = v.variant('type', [htmlMetatagsOptions.event]);
