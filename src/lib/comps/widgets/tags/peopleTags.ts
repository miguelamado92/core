import { list as listPeopleTaggings } from '$lib/schema/people/taggings';
import { parse } from '$lib/schema/valibot';
export async function load(personId: number) {
	const response = await fetch(`/api/v1/people/${personId}/tags`);
	const body = await response.json();
	return parse(listPeopleTaggings, body);
}
export async function add(personId: number, tagId: number): Promise<void> {
	const response = await fetch(`/api/v1/people/${personId}/tags/${tagId}`, {
		method: 'POST'
	});
}
export async function remove(personId: number, tagId: number): Promise<void> {
	const response = await fetch(`/api/v1/people/${personId}/tags/${tagId}`, {
		method: 'DELETE'
	});
}
