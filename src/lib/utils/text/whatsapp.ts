import type { Read as Instance } from '$lib/schema/core/instance';
import type { Read as Event } from '$lib/schema/events/events';
import { formatDate } from './date';

export function renderRegistrationLink(
	instance: Instance,
	event: Event
): { text: string; url: string } {
	const whatsappPhoneNumberId = instance.settings.communications.whatsapp.phone_number_id?.replace(
		'+',
		''
	);
	// TODO: Pick the string #4fg6XFDE32 from some sort of actions store
	const text = `Hi! I'm interested in ${event.name} [#4fg6XFDE32:${event.id}] on ${formatDate(event.starts_at)}`;
	return {
		text: 'Whatsapp registration link',
		url: `https://wa.me/${whatsappPhoneNumberId}?text=${encodeURIComponent(text)}`
	};
}
