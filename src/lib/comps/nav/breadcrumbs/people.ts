import type { Localization } from '$lib/i18n';

export default function (t: Localization) {
	return {
		'/(app)/people': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			}
		],
		'/(app)/people/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.new_person(),
				href: () => '/people/new'
			}
		],
		'/(app)/people/[person_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.view_person(),
				href: (pageParams?: Record<string, unknown>) => `/people/${pageParams?.person_id}`
			}
		],
		'/(app)/people/[person_id]/edit': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.view_person(),
				href: (pageParams?: Record<string, unknown>) => `/people/${pageParams?.person_id}`
			},
			{
				title: () => t.pages.people.edit_person(),
				href: (pageParams?: Record<string, unknown>) => `/people/${pageParams?.person_id}/edit`
			}
		],
		'/(app)/people/filter': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.filter(),
				href: () => '/people/filter'
			}
		],
		'/(app)/people/groups': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.groups.index(),
				href: () => '/people/groups'
			}
		],
		'/(app)/people/groups/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.groups.index(),
				href: () => '/people/groups'
			},
			{
				title: () => t.pages.people.groups.new(),
				href: () => '/people/groups/new'
			}
		],
		'/(app)/people/groups/[group_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.groups.index(),
				href: () => '/people/groups'
			},
			{
				title: () => t.pages.people.groups.view(),
				href: (pageParams?: Record<string, unknown>) => `/people/groups/${pageParams?.group_id}`
			}
		],
		'/(app)/people/lists': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.lists.index(),
				href: () => '/people/lists'
			}
		],
		'/(app)/people/lists/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.lists.index(),
				href: () => '/people/lists'
			},
			{
				title: () => t.pages.people.lists.new(),
				href: () => '/people/lists/new'
			}
		],
		'/(app)/people/lists/[list_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.lists.index(),
				href: () => '/people/lists'
			},
			{
				title: () => t.pages.people.lists.view(),
				href: (pageParams?: Record<string, unknown>) => `/people/lists/${pageParams?.list_id}`
			}
		],
		'/(app)/people/lists/[list_id]/edit': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.people.index(),
				href: () => '/people'
			},
			{
				title: () => t.pages.people.lists.index(),
				href: () => '/people/lists'
			},
			{
				title: () => t.pages.people.lists.view(),
				href: (pageParams?: Record<string, unknown>) => `/people/lists/${pageParams?.list_id}`
			},
			{
				title: () => t.pages.people.lists.edit(),
				href: (pageParams?: Record<string, unknown>) => `/people/lists/${pageParams?.list_id}/edit`
			}
		]
	};
}
