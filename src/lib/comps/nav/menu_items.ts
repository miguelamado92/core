import type { ComponentType, Component } from 'svelte'; //Compoment is deprecated in Svelte 5. Wait for Lucide to update its typings to the new Component type
import { type Icon } from 'lucide-svelte';

type MenuItem = {
	title: () => string;
	href: (pageParams?: Record<string, string>) => string;
	icon: ComponentType<Icon> | Component;
	children: {
		title: () => string;
		href: (pageParams?: Record<string, string>) => string;
		keyboardShortcut?: string;
		icon: ComponentType<Icon> | Component;
	}[];
};

import Dashboard from 'lucide-svelte/icons/area-chart';
//PEOPLE
import Users from 'lucide-svelte/icons/users';
import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal';
import Blend from 'lucide-svelte/icons/blend';
import List from 'lucide-svelte/icons/list';
//COMMUNICATIONS
import WhatsApp from '$lib/comps/icons/whatsapp.svelte';
import Send from 'lucide-svelte/icons/send';
import Envelope from 'lucide-svelte/icons/mail';
import MessageText from 'lucide-svelte/icons/message-square-text';
//WEBSITE
import Globe from 'lucide-svelte/icons/globe';
import NotePadText from 'lucide-svelte/icons/notepad-text';
import StickyNote from 'lucide-svelte/icons/sticky-note';
import FileUp from 'lucide-svelte/icons/file-up';
//EVENTS
import CalendarSearch from 'lucide-svelte/icons/calendar-search';
import CalendarClock from 'lucide-svelte/icons/calendar-clock';
import CalendarCheck from 'lucide-svelte/icons/calendar-check';
import CalendarPlus from 'lucide-svelte/icons/calendar-plus';
import Map from 'lucide-svelte/icons/map';
//ACTIONS
import FilePen from 'lucide-svelte/icons/file-pen';
import MessageCircleQuestion from 'lucide-svelte/icons/message-circle-question';
import HandCoins from 'lucide-svelte/icons/hand-coins';
import MailWarning from 'lucide-svelte/icons/mail-warning';
//SETTINGS
import Cog from 'lucide-svelte/icons/cog';
import Megaphone from 'lucide-svelte/icons/megaphone';

/* import { page as pageStore } from '$app/stores';
import { get } from 'svelte/store'; */
import type { Localization } from '$lib/i18n';
/* const page = get(pageStore); */

function menus(t: Localization): { [key: string]: MenuItem } {
	return {
		top: {
			// don't actually need this title, href and icon -- this is just for the top level stuff
			title: () => t.pages.people.index(),
			href: () => '/people',
			icon: Users,
			children: [
				{
					title: () => t.pages.people.index(),
					href: () => '/people',
					icon: Users
				},
				{
					title: () => t.pages.communications.index(),
					href: () => '/communications',
					icon: Send
				},
				{
					title: () => t.pages.website.index(),
					href: () => '/website',
					icon: Globe
				},
				{
					title: () => t.pages.events.index(),
					href: () => '/events',
					icon: CalendarSearch
				},
				{
					title: () => t.pages.actions.petitions.index(),
					href: () => '/petitions',
					icon: FilePen
				}
			]
		},
		people: {
			title: () => t.pages.people.index(),
			href: () => '/people',
			icon: Users,
			children: [
				{
					title: () => t.pages.people.index(),
					href: () => '/people',
					icon: Users
				},
				{
					title: () => t.pages.people.filter(),
					href: () => '/people/filter',
					icon: SlidersHorizontal
				},
				{
					title: () => t.pages.people.groups.index(),
					href: () => '/people/groups',
					icon: Blend
				},
				{
					title: () => t.pages.people.lists.index(),
					href: () => '/people/lists',
					icon: List
				}
			]
		},
		communications: {
			title: () => t.pages.communications.index(),
			href: () => '/communications',
			icon: Send,
			children: [
				/* {
					title: () => t.pages.communications.index(),
					href: () => '/communications',
					icon: Dashboard
				}, */
				/* {
					title: () => t.pages.communications.whatsapp(),
					href: () => '/communications/whatsapp',
					icon: WhatsApp
				}, */
				{
					title: () => t.pages.communications.email.index(),
					href: () => '/communications/email',
					icon: Envelope
				}
				/* {
					title: () => t.pages.communications.sms(),
					href: () => '/communications/sms',
					icon: MessageText
				} */
			]
		},
		website: {
			title: () => t.pages.website.index(),
			href: () => '/website',
			icon: Globe,
			children: [
				/* {
					title: () => t.pages.website.dashboard(),
					href: () => '/website',
					icon: Dashboard
				}, */
				{
					title: () => t.pages.website.pages.index(),
					href: () => '/website/pages',
					icon: NotePadText
				},
				{
					title: () => t.pages.website.posts.index(),
					href: () => '/website/posts',
					icon: StickyNote
				}
				/* {
					title: () => t.pages.website.uploads(),
					href: () => '/website/uploads',
					icon: FileUp
				} */
			]
		},
		events: {
			title: () => t.pages.events.index(),
			href: () => '/events',
			icon: CalendarSearch,
			children: [
				{
					title: () => t.pages.events.index(),
					href: () => '/events',
					icon: CalendarSearch
				}
				/* {
					title: () => t.pages.events.my_events(),
					href: () => '/events/my_events',
					icon: CalendarClock
				}, */
				/* {
					title: () => t.pages.events.events_map(),
					href: () => '/events/upcoming',
					icon: Map
				}, */
				/* {
					title: () => t.pages.events.new_event(),
					href: () => '/events/new',
					icon: CalendarPlus
				} */
			]
		},
		actions: {
			title: () => t.pages.actions.index(),
			href: () => '/actions',
			icon: Dashboard,
			children: [
				/* {
					title: () => t.pages.actions.dashboard(),
					href: () => '/actions',
					icon: Dashboard
				}, */
				{
					title: () => t.pages.actions.petitions.index(),
					href: () => '/petitions',
					icon: FilePen
				}
				/* {
					title: () => t.pages.actions.surveys(),
					href: () => '/surveys',
					icon: MessageCircleQuestion
				}, */
				/* {
					title: () => t.pages.actions.fundraising(),
					href: () => '/fundraising',
					icon: HandCoins
				}, */
				/* {
					title: () => t.pages.actions.contact_campaigns(),
					href: () => '/contact_campaigns',
					icon: MailWarning
				} */
			]
		},
		settings: {
			title: () => t.pages.config.settings.index(),
			href: () => '/settings',
			icon: Cog,
			children: [
				{
					title: () => t.pages.config.settings.index(),
					href: () => '/settings',
					icon: Cog
				},
				{
					title: () => t.pages.config.settings.admins.index(),
					href: () => '/settings/admins',
					icon: Users
				},
				{
					title: () => t.pages.config.settings.communications.index(),
					href: () => '/settings/communications',
					icon: Megaphone
				},
				{
					title: () => t.pages.config.settings.website.index(),
					href: () => '/settings/website',
					icon: Globe
				}
			]
		},
		tasks: {
			title: () => t.pages.tasks.index(),
			href: () => '/tasks',
			icon: Dashboard,
			children: [
				{
					title: () => t.pages.tasks.index(),
					href: () => '/tasks',
					icon: Dashboard
				}
			]
		}
	};
}

export default menus;
