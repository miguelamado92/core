import type { Localization } from '$lib/i18n';

export default function (t: Localization) {
	return {
		'/(app)/website': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			}
		],
		'/(app)/website/pages': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.pages.index(),
				href: () => '/website/pages'
			}
		],
		'/(app)/website/pages/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.pages.index(),
				href: () => '/website/pages'
			},
			{
				title: () => t.pages.website.pages.new(),
				href: () => '/website/pages/new'
			}
		],
		'/(app)/website/pages/[page_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.pages.index(),
				href: () => '/website/pages'
			},
			{
				title: () => t.pages.website.pages.page_details(),
				href: (pageParams?: Record<string, string>) => `/website/pages/${pageParams?.page_id}`
			}
		],
		'/(app)/website/pages/[page_id]/analytics': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.pages.index(),
				href: () => '/website/pages'
			},
			{
				title: () => t.pages.website.pages.page_details(),
				href: (pageParams?: Record<string, string>) => `/website/pages/${pageParams?.page_id}`
			},
			{
				title: () => t.pages.website.pages.analytics(),
				href: (pageParams?: Record<string, string>) =>
					`/website/pages/${pageParams?.page_id}/analytics`
			}
		],
		'/(app)/website/posts': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.posts.index(),
				href: () => '/website/posts'
			}
		],
		'/(app)/website/posts/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.posts.index(),
				href: () => '/website/posts'
			},
			{
				title: () => t.pages.website.posts.new(),
				href: () => '/website/posts'
			}
		],
		'/(app)/website/posts/[post_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.posts.index(),
				href: () => '/website/posts'
			},
			{
				title: () => t.pages.website.posts.post_details(),
				href: (pageParams?: Record<string, string>) => `/website/posts/${pageParams?.post_id}`
			}
		],
		'/(app)/website/posts/[post_id]/analytics': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.posts.index(),
				href: () => '/website/posts'
			},
			{
				title: () => t.pages.website.posts.post_details(),
				href: (pageParams?: Record<string, string>) => `/website/posts/${pageParams?.post_id}`
			},
			{
				title: () => t.pages.website.posts.analytics(),
				href: (pageParams?: Record<string, string>) =>
					`/website/posts/${pageParams?.post_id}/analytics`
			}
		],
		'/(app)/website/uploads': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.website.index(),
				href: () => '/website'
			},
			{
				title: () => t.pages.website.uploads(),
				href: () => '/website/uploads'
			}
		]
	};
}
