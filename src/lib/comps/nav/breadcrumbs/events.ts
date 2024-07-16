import type { Localization } from '$lib/i18n';

export default function (t: Localization) {
	return {
		'/(app)/events': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			}
		],
		'/(app)/events/my_events': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.my_events(),
				href: () => '/events/my_events'
			}
		],
		'/(app)/events/upcoming': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.upcoming(),
				href: () => '/events/upcoming'
			}
		],
		'/(app)/events/past': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.past_events(),
				href: () => '/events/past'
			}
		],
		'/(app)/events/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.new_event(),
				href: () => '/events/new'
			}
		],
		'/(app)/events/[event_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.event_details(),
				href: (pageParams?: Record<string, string>) => `/events/${pageParams?.event_id}`
			}
		],
		'/(app)/events/[event_id]/edit': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.event_details(),
				href: (pageParams?: Record<string, string>) => `/events/${pageParams?.event_id}`
			},
			{
				title: () => t.pages.events.edit_event(),
				href: (pageParams?: Record<string, string>) => `/events/${pageParams?.event_id}/edit`
			}
		],
		'/(app)/events/[event_id]/register': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.events.index(),
				href: () => '/events'
			},
			{
				title: () => t.pages.events.event_details(),
				href: (pageParams?: Record<string, string>) => `/events/${pageParams?.event_id}`
			},
			{
				title: () => t.pages.events.register_attendees(),
				href: (pageParams?: Record<string, string>) => `/events/${pageParams?.event_id}/register`
			}
		]
	};
}
