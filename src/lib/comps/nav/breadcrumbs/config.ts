import { type Localization } from '$lib/i18n';
export default function (t: Localization) {
	return {
		'/(app)/settings': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			}
		],
		// ADMINS
		'/(app)/settings/admins': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.admins.index(),
				href: () => '/settings/admins'
			}
		],
		'/(app)/settings/admins/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.admins.index(),
				href: () => '/settings/admins'
			},
			{
				title: () => t.pages.config.settings.admins.new(),
				href: () => '/settings/admins/new'
			}
		],
		'/(app)/settings/admins/[admin_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.admins.index(),
				href: () => '/settings/admins'
			},
			{
				title: () => t.pages.config.settings.admins.edit(),
				href: (pageParams?: Record<string, string>) => `/settings/admins/${pageParams?.admin_id}`
			}
		],
		'/(app)/settings/communications': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.communications.index(),
				href: () => '/settings/communications'
			}
		],
		// COMMS
		// EMAIL
		'/(app)/settings/communications/email': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.communications.index(),
				href: () => '/settings/communications'
			},
			{
				title: () => t.pages.config.settings.communications.email.index(),
				href: () => '/settings/communications/email'
			}
		],
		'/(app)/settings/communications/email/templates': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.communications.index(),
				href: () => '/settings/communications'
			},
			{
				title: () => t.pages.config.settings.communications.email.index(),
				href: () => '/settings/communications/email'
			},
			{
				title: () => t.pages.config.settings.communications.email.templates.index(),
				href: () => '/settings/communications/email/templates'
			}
		],
		'/(app)/settings/communications/email/templates/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.communications.index(),
				href: () => '/settings/communications'
			},
			{
				title: () => t.pages.config.settings.communications.email.index(),
				href: () => '/settings/communications/email'
			},
			{
				title: () => t.pages.config.settings.communications.email.templates.index(),
				href: () => '/settings/communications/email/templates'
			},
			{
				title: () => t.pages.config.settings.communications.email.templates.new(),
				href: () => '/settings/communications/email/templates/new'
			}
		],
		'/(app)/settings/communications/email/templates/[template_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.communications.index(),
				href: () => '/settings/communications'
			},
			{
				title: () => t.pages.config.settings.communications.email.index(),
				href: () => '/settings/communications/email'
			},
			{
				title: () => t.pages.config.settings.communications.email.templates.index(),
				href: () => '/settings/communications/email/templates'
			},
			{
				title: () => t.pages.config.settings.communications.email.templates.edit(),
				href: (pageParams?: Record<string, string>) =>
					`/settings/communications/email/templates/${pageParams?.template_id}`
			}
		],
		// WEBSITE
		'/(app)/settings/website': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			}
		],
		'/(app)/settings/website/templates': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			},
			{
				title: () => t.pages.config.settings.website.templates.index(),
				href: () => '/settings/website/templates'
			}
		],
		'/(app)/settings/website/templates/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			},
			{
				title: () => t.pages.config.settings.website.templates.index(),
				href: () => '/settings/website/templates'
			},
			{
				title: () => t.pages.config.settings.website.templates.new(),
				href: () => '/settings/website/templates/new'
			}
		],
		'/(app)/settings/website/templates/[template_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			},
			{
				title: () => t.pages.config.settings.website.templates.index(),
				href: () => '/settings/website/templates'
			},
			{
				title: () => t.pages.config.settings.website.templates.edit(),
				href: (pageParams?: Record<string, string>) =>
					`/settings/website/templates/${pageParams?.template_id}`
			}
		],
		'/(app)/settings/website/blocks': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			},
			{
				title: () => t.pages.config.settings.website.blocks.index(),
				href: () => '/settings/website/blocks'
			}
		],
		'/(app)/settings/website/blocks/new': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			},
			{
				title: () => t.pages.config.settings.website.blocks.index(),
				href: () => '/settings/website/blocks'
			},
			{
				title: () => t.pages.config.settings.website.blocks.new(),
				href: () => '/settings/website/blocks/new'
			}
		],
		'/(app)/settings/website/blocks/[block_id]': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.settings.index(),
				href: () => '/settings'
			},
			{
				title: () => t.pages.config.settings.website.index(),
				href: () => '/settings/website'
			},
			{
				title: () => t.pages.config.settings.website.blocks.index(),
				href: () => '/settings/website/blocks'
			},
			{
				title: () => t.pages.config.settings.website.blocks.edit(),
				href: (pageParams?: Record<string, string>) =>
					`/settings/website/blocks/${pageParams?.block_id}`
			}
		],
		//PREFERENCES
		'/(app)/preferences': [
			{
				title: () => t.pages.home.index(),
				href: () => '/'
			},
			{
				title: () => t.pages.config.preferences(),
				href: () => '/preferences'
			}
		]
	};
}
