import type { Localization } from '$lib/i18n';
import type { ComponentType, Component } from 'svelte'; //Compoment is deprecated in Svelte 5. Wait for Lucide to update its typings to the new Component type
import type { Icon } from 'lucide-svelte';

import actions from '$lib/comps/nav/breadcrumbs/actions';
import communications from '$lib/comps/nav/breadcrumbs/communications';
import config from '$lib/comps/nav/breadcrumbs/config';
import events from '$lib/comps/nav/breadcrumbs/events';
import people from '$lib/comps/nav/breadcrumbs/people';
import tasks from '$lib/comps/nav/breadcrumbs/tasks';
import website from '$lib/comps/nav/breadcrumbs/website';

export type Breadcrumbs = {
	[key: string]: {
		title: () => string;
		icon?: ComponentType<Icon> | Component;
		href: (pageParams?: Record<string, string>) => string;
	}[];
};

export function breadcrumbs(t: Localization): Breadcrumbs {
	return {
		'/(app)/': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			}
		],
		...actions(t),
		...communications(t),
		...config(t),
		...events(t),
		...people(t),
		...tasks(t),
		...website(t)
	};
}

export function renderBreadcrumb(
	input: string,
	pageTitle: { key: string; title: string }[]
): string {
	// Check if the input starts with '{' and ends with '}'
	if (input[0] !== '{' || input[input.length - 1] !== '}') {
		return input;
	}

	// Remove the '{' at the beginning and '}' at the end
	const content = input.slice(1, -1);

	// Split the content by '|'
	const parts = content.split('|');

	// There should be exactly two parts
	if (parts.length !== 2) {
		return input;
	}
	const [keyword, fallback] = parts;
	let returnValue = fallback;
	pageTitle.forEach((item) => {
		console.log(item.key, keyword, fallback, item.key === keyword, item.title);
		if (item.key === keyword) returnValue = item.title;
	});

	return returnValue;
}
