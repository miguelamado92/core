import { type RequestEvent } from '@sveltejs/kit';
import { parse } from '$lib/schema/valibot';
import { create as createEvent } from '$lib/server/api/events/events';
import { create as createPetition } from '$lib/server/api/petitions/petitions';
import { create as createSend } from '$lib/server/api/communications/email/sends';

import { create as createTag } from '$lib/server/api/core/tags';
import { create as createList } from '$lib/server/api/people/lists';
import { create as createGroup } from '$lib/server/api/people/groups';
import { update as updateInstance } from '$lib/server/api/core/instances';

import { list as listPeople } from '$lib/server/api/people/people';
import { queue as queueInteraction } from '$lib/server/api/people/interactions';

import { type Create as CreateEvent, create as createEventSchema } from '$lib/schema/events/events';
import {
	type Create as CreatePetition,
	create as createPetitionSchema
} from '$lib/schema/petitions/petitions';
import {
	type Create as CreateSend,
	create as createSendSchema
} from '$lib/schema/communications/email/sends';

export default async function (event: RequestEvent): Promise<RequestEvent> {
	console.log('Installing instance');
	/* const onlineEventBody: CreateEvent = parse(createEventSchema, {
		name: 'Test online event',
		slug: 'test_online_event',
		heading: 'Online Training: How to use Belcoda',
		html: `<p>Urna mattis hendrerit hendrerit dictumst elit volutpat nisl justo taciti congue. Natoque odio, etiam potenti sodales. Ad senectus dictum phasellus orci fermentum leo ac morbi netus. Vestibulum ornare, orci viverra felis posuere etiam class congue gravida tincidunt fames amet? Ligula malesuada faucibus imperdiet quis parturient ridiculus non pharetra. Ultrices non platea erat nec leo rutrum dictum nascetur mus sed sodales. Molestie ad magna risus eget aliquam duis.</p>
<p>Montes suspendisse consequat potenti? Ridiculus elementum vivamus arcu penatibus. Leo habitasse duis magna magnis. Aptent et risus curae;. Leo accumsan massa nullam tortor montes interdum gravida eleifend sit aliquet ullamcorper eget. Suscipit primis ligula elit dictum dignissim. Fusce conubia purus dictumst eget dolor at ridiculus penatibus class risus pulvinar dignissim. Massa quam.</p>
<p>Ullamcorper tortor hac, rutrum consectetur sodales semper. Primis nullam dis metus nisl donec! Quam vitae gravida ipsum maecenas mauris lorem auctor sagittis donec nostra. Neque quam sollicitudin consequat nibh praesent fames, vivamus fringilla. Vulputate arcu posuere purus natoque nisi platea erat consequat nam nec. Eu suspendisse hendrerit ad gravida quis curabitur. Montes; fermentum convallis vehicula. Posuere pulvinar dictum tincidunt senectus platea morbi.</p>
<p>Est et; fusce potenti porta. Feugiat eleifend viverra lacinia per ultrices fringilla adipiscing velit. Urna, enim viverra conubia platea volutpat urna lacinia lacinia torquent curabitur torquent! In sem rutrum himenaeos felis hac. Pharetra rhoncus egestas montes urna nascetur himenaeos consequat mi justo. Ante diam, non nascetur mattis nascetur id libero lobortis class porta. Fermentum mus mus sociis ac cubilia id et.</p>`,
		starts_at: getTimeTwoWeeksFromNow(17, 30),
		ends_at: getTimeTwoWeeksFromNow(19, 30),
		online: true,
		online_url: 'https://zoom.us/j/123456789'
	});
	const onlineEvent = await createEvent({
		instanceId: event.locals.instance.id,
		body: onlineEventBody,
		adminId: event.locals.admin.id,
		t: event.locals.t,
		defaultEmailTemplateId: event.locals.instance.settings.events.default_email_template_id,
		defaultTemplateId: event.locals.instance.settings.events.default_template_id
	}); */

	/* const inPersonEventBody: CreateEvent = parse(createEventSchema, {
		name: 'Test event',
		slug: 'test_event',
		heading: 'Discussion: The Future of Work',
		html: `<p>Urna mattis hendrerit hendrerit dictumst elit volutpat nisl justo taciti congue. Natoque odio, etiam potenti sodales. Ad senectus dictum phasellus orci fermentum leo ac morbi netus. Vestibulum ornare, orci viverra felis posuere etiam class congue gravida tincidunt fames amet? Ligula malesuada faucibus imperdiet quis parturient ridiculus non pharetra. Ultrices non platea erat nec leo rutrum dictum nascetur mus sed sodales. Molestie ad magna risus eget aliquam duis.</p>
<p>Montes suspendisse consequat potenti? Ridiculus elementum vivamus arcu penatibus. Leo habitasse duis magna magnis. Aptent et risus curae;. Leo accumsan massa nullam tortor montes interdum gravida eleifend sit aliquet ullamcorper eget. Suscipit primis ligula elit dictum dignissim. Fusce conubia purus dictumst eget dolor at ridiculus penatibus class risus pulvinar dignissim. Massa quam.</p>
<p>Ullamcorper tortor hac, rutrum consectetur sodales semper. Primis nullam dis metus nisl donec! Quam vitae gravida ipsum maecenas mauris lorem auctor sagittis donec nostra. Neque quam sollicitudin consequat nibh praesent fames, vivamus fringilla. Vulputate arcu posuere purus natoque nisi platea erat consequat nam nec. Eu suspendisse hendrerit ad gravida quis curabitur. Montes; fermentum convallis vehicula. Posuere pulvinar dictum tincidunt senectus platea morbi.</p>
<p>Est et; fusce potenti porta. Feugiat eleifend viverra lacinia per ultrices fringilla adipiscing velit. Urna, enim viverra conubia platea volutpat urna lacinia lacinia torquent curabitur torquent! In sem rutrum himenaeos felis hac. Pharetra rhoncus egestas montes urna nascetur himenaeos consequat mi justo. Ante diam, non nascetur mattis nascetur id libero lobortis class porta. Fermentum mus mus sociis ac cubilia id et.</p>`,
		starts_at: getTimeTwoWeeksFromNow(18, 30),
		ends_at: getTimeTwoWeeksFromNow(21, 0),
		online: false,
		address_line_1: 'The Old Vic',
		address_line_2: '103 The Cut',
		locality: 'London',
		postcode: 'SE1 8NB'
	});

	const inPersonEvent = await createEvent({
		instanceId: event.locals.instance.id,
		body: inPersonEventBody,
		adminId: event.locals.admin.id,
		t: event.locals.t,
		defaultEmailTemplateId: event.locals.instance.settings.events.default_email_template_id,
		defaultTemplateId: event.locals.instance.settings.events.default_template_id
	}); */

	/* const petitionBody: CreatePetition = parse(createPetitionSchema, {
		name: 'Test Petition',
		slug: 'test_petition',
		heading: 'Sign the People’s Pledge for Renters!',
		petition_target: 'To the Prime Minister',
		petition_text:
			'We, the undersigned, call upon the Prime Minister to immediately give all renters the legal and economic rights they deserve.',
		html: `<p> Urna mattis hendrerit hendrerit dictumst elit volutpat nisl justo taciti congue. Natoque odio, etiam potenti sodales. Ad senectus dictum phasellus orci fermentum leo ac morbi netus. Vestibulum ornare, orci viverra felis posuere etiam class congue gravida tincidunt fames amet? Ligula malesuada faucibus imperdiet quis parturient ridiculus non pharetra. Ultrices non platea erat nec leo rutrum dictum nascetur mus sed sodales. Molestie ad magna risus eget aliquam duis.</p>
<p>Montes suspendisse consequat potenti? Ridiculus elementum vivamus arcu penatibus. Leo habitasse duis magna magnis. Aptent et risus curae;. Leo accumsan massa nullam tortor montes interdum gravida eleifend sit aliquet ullamcorper eget. Suscipit primis ligula elit dictum dignissim. Fusce conubia purus dictumst eget dolor at ridiculus penatibus class risus pulvinar dignissim. Massa quam.</p>
<p>Ullamcorper tortor hac, rutrum consectetur sodales semper. Primis nullam dis metus nisl donec! Quam vitae gravida ipsum maecenas mauris lorem auctor sagittis donec nostra. Neque quam sollicitudin consequat nibh praesent fames, vivamus fringilla. Vulputate arcu posuere purus natoque nisi platea erat consequat nam nec. Eu suspendisse hendrerit ad gravida quis curabitur. Montes; fermentum convallis vehicula. Posuere pulvinar dictum tincidunt senectus platea morbi.</p>
<p>Est et; fusce potenti porta. Feugiat eleifend viverra lacinia per ultrices fringilla adipiscing velit. Urna, enim viverra conubia platea volutpat urna lacinia lacinia torquent curabitur torquent! In sem rutrum himenaeos felis hac. Pharetra rhoncus egestas montes urna nascetur himenaeos consequat mi justo. Ante diam, non nascetur mattis nascetur id libero lobortis class porta. Fermentum mus mus sociis ac cubilia id et.</p>`
	});

	const petition = await createPetition({
		instanceId: event.locals.instance.id,
		body: petitionBody,
		adminId: event.locals.admin.id,
		t: event.locals.t
	}); */

	/* const emailSendBody = parse(createSendSchema, {
		name: 'Test email send'
	});
	await createSend({
		instanceId: event.locals.instance.id,
		body: emailSendBody,
		adminId: event.locals.admin.id,
		defaultTemplateId: event.locals.instance.settings.communications.email.default_template_id,
		t: event.locals.t
	}); */

	/* await createTag({ instanceId: event.locals.instance.id, body: { name: 'topic:energy' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'topic:agriculture' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'topic:fisheries' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'topic:women' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'topic:forestry' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'circle:core' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'circle:active' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'circle:inactive' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'volunteer' } });
	await createTag({ instanceId: event.locals.instance.id, body: { name: 'donor' } });
	await createTag({
		instanceId: event.locals.instance.id,
		body: { name: 'attended:231011climatecamp' }
	}); */

	/* await createList({
		instanceId: event.locals.instance.id,
		body: { name: 'Test list' },
		t: event.locals.t
	}); */
	/* await createGroup({
		instanceId: event.locals.instance.id,
		body: { name: 'Test group' },
		t: event.locals.t,
		adminId: event.locals.admin.id,
		url: event.url
	}); */

	await updateInstance({
		instanceId: event.locals.instance.id,
		body: { installed: true },
		t: event.locals.t
	});
	event.locals.instance.installed = true;

	const people = await listPeople({
		instance_id: event.locals.instance.id,
		url: event.url,
		t: event.locals.t,
		notPaged: true
	});
	for (let index = 0; index < people.items.length; index++) {
		const element = people.items[index];
		await queueInteraction({
			instanceId: event.locals.instance.id,
			personId: element.id,
			adminId: event.locals.admin.id,
			details: {
				type: 'person_added',
				details: {
					method: 'manual'
				}
			},
			queue: event.locals.queue
		});
	}
	console.log('Installed instance');
	return event;
}

function getTimeTwoWeeksFromNow(hours: number, minutes: number): Date {
	// Create a date object for the current date and time
	const now = new Date();

	// Calculate the date two weeks from now
	const twoWeeksFromNow = new Date(now);
	twoWeeksFromNow.setDate(now.getDate() + 14);

	// Set the time to 8:30 PM (20:30)
	twoWeeksFromNow.setHours(hours);
	twoWeeksFromNow.setMinutes(minutes);
	twoWeeksFromNow.setSeconds(0);
	twoWeeksFromNow.setMilliseconds(0);

	// Return the ISO string
	return twoWeeksFromNow;
}
