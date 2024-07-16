import Logout from 'lucide-svelte/icons/log-out';
import Cog from 'lucide-svelte/icons/cog';
import Settings from 'lucide-svelte/icons/settings-2';
import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';

import type { Localization } from '$lib/i18n';

export default function (t: Localization) {
	return {
		my_tasks: {
			title: () => t.pages.tasks.index(),
			href: () => '/tasks',
			icon: CircleCheckBig
		},
		settings: {
			title: () => t.pages.config.settings.index(),
			href: () => '/settings',
			icon: Cog
		},
		/* preferences: {
			title: () => t.pages.config.preferences(),
			href: () => '/preferences',
			disabled: true,
			icon: Settings
		}, */
		logout: {
			title: () => t.pages.auth.logout(),
			href: () => '/logout',
			icon: Logout
		}
	};
}
