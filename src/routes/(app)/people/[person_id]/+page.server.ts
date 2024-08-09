import { loadError } from '$lib/server';
import { read } from '$lib/schema/people/people';
import { parse } from '$lib/schema/valibot';
import { formattedPhoneNumber } from '$lib/schema/people/channels/channels';

export async function load(event) {
	const result = await event.fetch(`/api/v1/people/${event.params.person_id}`);
	if (!result.ok) return loadError(result);
	const body = await result.json();
	const parsed = parse(read, body);
	const nationalFormatPhoneNumber = parsed.phone_number?.phone_number
		? parse(formattedPhoneNumber, parsed.phone_number)
		: null;
	const personRecord = { ...parsed, phone_number: nationalFormatPhoneNumber };
	return { person: personRecord, pageTitle: [{ key: 'PERSONNAME', title: parsed.full_name }] };
}
