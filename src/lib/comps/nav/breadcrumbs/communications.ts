import { type Localization } from '$lib/i18n';

export default function (t: Localization) {
	return {
		'/(app)/communications': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			}
		],
		'/(app)/communications/whatsapp': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.whatsapp.index(),
				href: () => '/communications/whatsapp'
			}
		],
		'/(app)/communications/whatsapp/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.whatsapp.index(),
				href: () => '/communications/whatsapp'
			},
			{
				title: () => t.pages.communications.whatsapp.new(),
				href: () => '/communications/whatsapp/new'
			}
		],
		'/(app)/communications/whatsapp/[thread_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.whatsapp.index(),
				href: () => '/communications/whatsapp'
			},
			{
				title: () => t.pages.communications.whatsapp.edit(),
				href: (pageParams?: Record<string, unknown>) =>
					`/communications/whatsapp/${pageParams?.thread_id}`
			}
		],
		'/(app)/communications/email': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.email.index(),
				href: () => '/communications/email'
			}
		],
		'/(app)/communications/email/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.email.index(),
				href: () => '/communications/email'
			},
			{
				title: () => t.pages.communications.email.new(),
				href: () => '/communications/email/new'
			}
		],
		'/(app)/communications/email/[send_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.email.index(),
				href: () => '/communications/email'
			},
			{
				title: () => t.pages.communications.email.view(),
				href: (params: Record<string, unknown>) => `/communications/email/${params.send_id}`
			}
		],
		'/(app)/communications/email/[send_id]/edit': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.email.index(),
				href: () => '/communications/email'
			},
			{
				title: () => t.pages.communications.email.view(),
				href: (params: Record<string, unknown>) => `/communications/email/${params.send_id}`
			},
			{
				title: () => t.pages.communications.email.edit(),
				href: (params: Record<string, unknown>) => `/communications/email/${params.send_id}/edit`
			}
		],
		'/(app)/communications/sms': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.communications.index(),
				href: () => '/communications'
			},
			{
				title: () => t.pages.communications.sms(),
				href: () => '/communications/sms'
			}
		]
	};
}
