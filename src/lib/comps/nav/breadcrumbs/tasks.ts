import type { Localization } from '$lib/i18n';

export default function (t: Localization) {
	return {
		'/(app)/tasks': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.tasks.index(),
				href: () => '/tasks'
			}
		]
	};
}
