import actionHeader from '$lib/server/templates/website/blocks/headers/action_header.hbs?raw';
import defaultHeader from '$lib/server/templates/website/blocks/headers/default_header.hbs?raw';
import footer from '$lib/server/templates/website/blocks/footers/footer.hbs?raw';

//events
import eventSuccess from '$lib/server/templates/website/blocks/events/success.hbs?raw';
import eventPageContent from '$lib/server/templates/website/blocks/events/page_content.hbs?raw';
import eventSidebar from '$lib/server/templates/website/blocks/events/sidebar.hbs?raw';
import eventInfo from '$lib/server/templates/website/blocks/events/event_info.hbs?raw';
import eventForm from '$lib/server/templates/website/blocks/events/event_form.hbs?raw';

//utils
import utilsError from '$lib/server/templates/website/blocks/utils/error.hbs?raw';

const blocks = [
	{
		name: 'action_header',
		template: actionHeader
	},
	{
		name: 'default_header',
		template: defaultHeader
	},
	{
		name: 'footer',
		template: footer
	},

	//events
	{
		name: 'event_success',
		template: eventSuccess
	},
	{
		name: 'event_page_content',
		template: eventPageContent
	},
	{
		name: 'event_sidebar',
		template: eventSidebar
	},
	{
		name: 'event_info',
		template: eventInfo
	},
	{
		name: 'event_form',
		template: eventForm
	},

	//utils
	{
		name: 'error',
		template: utilsError
	}
];

export default blocks;
