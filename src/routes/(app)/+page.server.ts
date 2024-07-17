import { list as listPeople } from '$lib/schema/people/people';
import { list as listEvents } from '$lib/schema/events/events';
import { list as listGroups } from '$lib/schema/people/groups';
import { list as listContent } from '$lib/schema/website/content';
import { parse } from '$lib/schema/valibot';

export async function load(event) {
	const peopleResponse = await event.fetch('/api/v1/people?perPage=5');
	const peopleBody = await peopleResponse.json();
	const people = parse(listPeople, peopleBody);

	const eventsResponse = await event.fetch('/api/v1/events?perPage=5');
	const eventsBody = await eventsResponse.json();
	const events = parse(listEvents, eventsBody);

	const groupsResponse = await event.fetch('/api/v1/people/groups?perPage=5');
	const groupsBody = await groupsResponse.json();
	const groups = parse(listGroups, groupsBody);

	const pagesResponse = await event.fetch(
		`/api/v1/website/content_types/${event.locals.instance.settings.website.pages_content_type_id}/content?perPage=5`
	);
	const pagesBody = await pagesResponse.json();
	const pages = parse(listContent, pagesBody);

	const postsResponse = await event.fetch(
		`/api/v1/website/content_types/${event.locals.instance.settings.website.posts_content_type_id}/content?perPage=5`
	);
	const postsBody = await postsResponse.json();
	const posts = parse(listContent, postsBody);

	return { people, events, groups, pages, posts };
}
