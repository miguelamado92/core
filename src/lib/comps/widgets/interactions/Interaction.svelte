<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentType, Component } from 'svelte'; //Compoment is deprecated in Svelte 5. Wait for Lucide to update its typings to the new Component type
	import { type Icon } from 'lucide-svelte';
	import { type Read as ReadPerson } from '$lib/schema/people/people';
	import { type Read as ReadAdmin } from '$lib/schema/core/admin';
	import { type Read as ReadInteraction } from '$lib/schema/people/interactions';
	const {
		interaction,
		person,
		last = false
	}: { interaction: ReadInteraction; person: ReadPerson; last?: boolean } = $props();
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';

	//icons
	import NotepadText from 'lucide-svelte/icons/notepad-text';
	import PhoneOut from 'lucide-svelte/icons/phone-outgoing';
	import PhoneIn from 'lucide-svelte/icons/phone-incoming';
	import Mail from 'lucide-svelte/icons/mail';
	import SquarePen from 'lucide-svelte/icons/square-pen';
	import CalendarPlus from 'lucide-svelte/icons/calendar-plus';
	import CalendarMinus from 'lucide-svelte/icons/calendar-minus';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import CalendarX from 'lucide-svelte/icons/calendar-x';

	import RenderInboundWhatsapp from '$lib/comps/widgets/interactions/RenderInboundWhatsapp.svelte';
	import RenderOutboundWhatsapp from '$lib/comps/widgets/interactions/RenderOutboundWhatsapp.svelte';
</script>

{#if interaction.details.type === 'person_added'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.added(interaction.details.details),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'person_joined'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.joined(interaction.details.details),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'user_details_updated'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.user_details_updated(interaction.details.method),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'notes'}
	{@render adminMessage(
		interaction.admin,
		interaction.details.notes,
		interaction.created_at,
		NotepadText
	)}
{/if}

{#if interaction.details.type === 'phone_call_outbound'}
	{@render adminMessage(
		interaction.admin,
		interaction.details.notes,
		interaction.created_at,
		PhoneOut
	)}
{/if}

{#if interaction.details.type === 'phone_call_inbound'}
	{@render userMessage(person, interaction.details.notes, interaction.created_at, PhoneIn)}
{/if}

{#if interaction.details.type === 'email_outbound'}
	{@render adminMessage(
		interaction.admin,
		`<div class="font-bold">${interaction.details.subject}</div>
    <div class="mt-1">${interaction.details.message}<div>`,
		interaction.created_at,
		Mail
	)}
{/if}

{#if interaction.details.type === 'email_inbound'}
	{@render userMessage(
		person,
		`<div class="font-bold">${interaction.details.subject}</div>
    <div class="mt-1">${interaction.details.message}<div>`,
		interaction.created_at,
		Mail
	)}
{/if}

{#if interaction.details.type === 'outbound_whatsapp'}
	<RenderOutboundWhatsapp
		messageId={interaction.details.message_id}
		message={interaction.details.message}
		template={interaction.details.template}
		admin={interaction.admin}
		timeAgo={interaction.created_at}
	/>
{/if}

{#if interaction.details.type === 'inbound_whatsapp'}
	<RenderInboundWhatsapp
		{person}
		timeAgo={interaction.created_at}
		messageId={interaction.details.message_id}
		message={interaction.details.message}
	/>
{/if}

{#if interaction.details.type === 'signed_petition'}
	{#if interaction.details.method === 'manual'}
		{@render adminMessage(
			interaction.admin,
			$page.data.t.people.interactions.html.signed_petition(
				interaction.details.petition_id,
				interaction.details.petition_name
			),
			interaction.created_at,
			SquarePen
		)}
	{:else}
		{@render userMessage(
			person,
			$page.data.t.people.interactions.html.signed_petition(
				interaction.details.petition_id,
				interaction.details.petition_name
			),
			interaction.created_at,
			SquarePen
		)}
	{/if}
{/if}

{#if interaction.details.type === 'registered_for_event'}
	{#if interaction.details.method === 'manual'}
		{@render adminMessage(
			interaction.admin,
			$page.data.t.people.interactions.html.registered_for_event(
				interaction.details.event_id,
				interaction.details.event_name
			),
			interaction.created_at,
			CalendarPlus
		)}
	{:else}
		{@render userMessage(
			person,
			$page.data.t.people.interactions.html.registered_for_event(
				interaction.details.event_id,
				interaction.details.event_name
			),
			interaction.created_at,
			CalendarPlus
		)}
	{/if}
{/if}

{#if interaction.details.type === 'cancelled_event_registration'}
	{#if interaction.details.method === 'manual'}
		{@render adminMessage(
			interaction.admin,
			$page.data.t.people.interactions.html.cancelled_event_registration(
				interaction.details.event_id,
				interaction.details.event_name
			),
			interaction.created_at,
			CalendarMinus
		)}
	{:else}
		{@render userMessage(
			person,
			$page.data.t.people.interactions.html.cancelled_event_registration(
				interaction.details.event_id,
				interaction.details.event_name
			),
			interaction.created_at,
			CalendarMinus
		)}
	{/if}
{/if}

{#if interaction.details.type === 'attended_event'}
	{@render userMessage(
		person,
		$page.data.t.people.interactions.html.attended_event(
			interaction.details.event_id,
			interaction.details.event_name
		),
		interaction.created_at,
		CalendarCheck
	)}
{/if}

{#if interaction.details.type === 'noshow_event'}
	{@render userMessage(
		person,
		$page.data.t.people.interactions.html.noshow_event(
			interaction.details.event_id,
			interaction.details.event_name
		),
		interaction.created_at,
		CalendarX
	)}
{/if}

{#if interaction.details.type === 'received_event_followup_email'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.received_event_followup_email(
			interaction.details.event_id,
			interaction.details.event_name,
			interaction.details.message_id
		),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'received_event_reminder_email'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.received_event_reminder_email(
			interaction.details.event_id,
			interaction.details.event_name,
			interaction.details.message_id
		),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'received_event_cancellation_email'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.received_event_cancellation_email(
			interaction.details.event_id,
			interaction.details.event_name,
			interaction.details.message_id
		),
		interaction.created_at
	)}
{/if}
{#if interaction.details.type === 'received_event_registration_email'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.received_event_registration_email(
			interaction.details.event_id,
			interaction.details.event_name,
			interaction.details.message_id
		),
		interaction.created_at
	)}
{/if}
{#if interaction.details.type === 'received_petition_autoresponse_email'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.received_petition_autoresponse_email(
			interaction.details.petition_id,
			interaction.details.petition_name,
			interaction.details.message_id
		),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'whatsapp_verified'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.whatsapp_verified(interaction.details.phone_number),
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'added_to_list'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.added_to_list(
			interaction.details.list_id,
			interaction.details.list_name
		),
		interaction.created_at
	)}
{/if}
{#if interaction.details.type === 'removed_from_list'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.removed_from_list(
			interaction.details.list_id,
			interaction.details.list_name
		),
		interaction.created_at
	)}
{/if}
{#if interaction.details.type === 'added_tag'}
	{@render systemMessage(
		`<div class="flex items-center gap-2"><div>${$page.data.t.people.interactions.html.added_tag()}</div><div class="font-bold">#${interaction.details.tag_name}</div></div>`,
		interaction.created_at
	)}
{/if}
{#if interaction.details.type === 'removed_tag'}
	{@render systemMessage(
		`<div class="flex items-center gap-2"><div>${$page.data.t.people.interactions.html.removed_tag()}</div><div class="font-bold">#${interaction.details.tag_name}</div></div>`,
		interaction.created_at
	)}
{/if}

{#if interaction.details.type === 'added_to_group'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.added_to_group(
			interaction.details.group_id,
			interaction.details.group_name
		),
		interaction.created_at
	)}
{/if}
{#if interaction.details.type === 'removed_from_group'}
	{@render systemMessage(
		$page.data.t.people.interactions.html.removed_from_group(
			interaction.details.group_id,
			interaction.details.group_name
		),
		interaction.created_at
	)}
{/if}

{#snippet systemMessage(message: string, timeAgo: Date)}
	<div class="flex justify-center my-4">
		<div class="text-xs text-gray-500 leading-none">
			<div class="bg-gray-100 rounded-full py-1 px-4">{@html message}</div>
			<div class="mt-2 text-center">{$page.data.timeAgo.format(timeAgo)}</div>
		</div>
	</div>
{/snippet}

{#snippet userMessage(user: ReadPerson, message: string, timeAgo: Date, icon: ComponentType<Icon> | Component)}
	<div class="flex w-full mt-2 space-x-3 max-w-xl">
		<Avatar profile_picture_url={null} full_name={user.full_name} class="h-10 w-10" />
		<div>
			<div class="flex">
				<div class="mt-1 px-2 py-1.5 border rounded-lg text-sm">
					{@html message}
				</div>
			</div>
			<div class="flex gap-1 items-center mt-1">
				<div><svelte:component this={icon} class="h-4 w-4 text-gray-500" /></div>
				<span class="text-xs text-gray-500 leading-none">{$page.data.timeAgo.format(timeAgo)}</span>
			</div>
		</div>
	</div>
{/snippet}

{#snippet adminMessage(admin: ReadAdmin, message: string, timeAgo: Date, icon: ComponentType<Icon> | Component)}
	<div class="flex w-full mt-2 space-x-3 max-w-xl ml-auto justify-end">
		<div>
			<div class="flex justify-end">
				<div class="mt-1 px-2 py-1.5 bg-blue-500 text-white rounded-lg text-sm">
					{@html message}
				</div>
			</div>
			<div class="flex gap-1 items-center mt-1">
				<div><svelte:component this={icon} class="h-4 w-4 text-gray-500" /></div>
				<span class="text-xs text-gray-500 leading-none">{$page.data.timeAgo.format(timeAgo)}</span>
			</div>
		</div>
		<Avatar
			profile_picture_url={admin.profile_picture_url}
			full_name={admin.full_name}
			class="h-10 w-10"
		/>
	</div>
{/snippet}
