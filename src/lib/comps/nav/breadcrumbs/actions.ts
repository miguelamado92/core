import { page as pageStore } from '$app/stores';
import type { Localization } from '$lib/i18n';
export default function (t: Localization) {
	return {
		'/(app)/actions': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.index(),
				href: () => '/actions'
			}
		],
		'/(app)/petitions': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.petitions.index(),
				href: () => '/petitions'
			}
		],
		'/(app)/petitions/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.petitions.index(),
				href: () => '/petitions'
			},
			{
				title: () => t.pages.actions.petitions.new(),
				href: () => '/petitions/new'
			}
		],
		'/(app)/petitions/[petition_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.petitions.index(),
				href: () => '/petitions'
			},
			{
				title: () => t.pages.actions.petitions.view(),
				href: (params: Record<string, unknown>) => `/petitions/${params.petition_id}`
			}
		],
		'/(app)/petitions/[petition_id]/edit': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},

			{
				title: () => t.pages.actions.petitions.index(),
				href: () => '/petitions'
			},
			{
				title: () => t.pages.actions.petitions.view(),
				href: (params: Record<string, unknown>) => `/petitions/${params.petition_id}`
			},
			{
				title: () => t.pages.actions.petitions.edit(),
				href: (params: Record<string, unknown>) => `/petitions/${params.petition_id}/edit`
			}
		],
		'/(app)/actions/surveys': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.index(),
				href: () => '/actions'
			},
			{
				title: () => t.pages.actions.surveys(),
				href: () => '/actions/surveys'
			}
		],
		'/(app)/actions/fundraising': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.index(),
				href: () => '/actions'
			},
			{
				title: () => t.pages.actions.fundraising(),
				href: () => '/actions/fundraising'
			}
		],
		'/(app)/actions/contact_campaigns': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.actions.index(),
				href: () => '/actions'
			},
			{
				title: () => t.pages.actions.contact_campaigns(),
				href: () => '/actions/contact_campaigns'
			}
		]
	};
}
