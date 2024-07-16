import type { LayoutLoad } from './$types';
import { Localization } from '$lib/i18n';
import timeAgo from '$lib/i18n/time_ago';
export const load: LayoutLoad = (event) => {
	return {
		language: event.data.language,
		admin: event.data.admin,
		instance: event.data.instance,
		t: new Localization(event.data.language),
		timeAgo: timeAgo(event.data.language),
		pageTitle: []
	};
};
