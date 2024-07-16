import type { Read, List } from '$lib/schema/people/people';
import type { ViewBase as EventAttendee } from '$lib/schema/events/attendees';
import type { Country } from '$lib/schema/valibot';
export function nameToInitials(name: string): string {
	try {
		//@ts-ignore
		return name
			.match(/(^\S\S?|\s\S)?/g)
			.map((v) => v.trim())
			.join('')
			.match(/(^\S|\S$)?/g)
			.join('')
			.toLocaleUpperCase();
	} catch (err) {
		return 'XX';
	}
}

export function renderName(person: Read | List[number] | EventAttendee, country: Country): string {
	if (person.full_name) return person.full_name;
	if (country === 'jp') return `${person?.family_name} ${person?.given_name}`.trim();
	return `${person?.given_name} ${person?.family_name}`.trim();
}
