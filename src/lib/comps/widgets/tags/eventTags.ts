import { list as listPeopleTaggings } from '$lib/schema/events/taggings';
import { parse } from '$lib/schema/valibot';
export async function load(eventId: number) {
	const response = await fetch(`/api/v1/events/${eventId}/tags`);
	const body = await response.json();
	return parse(listPeopleTaggings, body);
}

export async function add(eventId: number, tagId: number): Promise<void> {
	const response = await fetch(`/api/v1/events/${eventId}/tags/${tagId}`, {
		method: 'POST'
	});
}

export async function remove(eventId: number, tagId: number): Promise<void> {
	const response = await fetch(`/api/v1/events/${eventId}/tags/${tagId}`, {
		method: 'DELETE'
	});
}
