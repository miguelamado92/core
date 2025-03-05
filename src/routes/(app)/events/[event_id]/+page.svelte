<script lang="ts">
	const { data } = $props();
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
	import { renderAddress } from '$lib/utils/text/address';
	import { formatDateTimeRange, formatDate } from '$lib/utils/text/date';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import CalendarClock from 'lucide-svelte/icons/calendar-clock';
	import Link from 'lucide-svelte/icons/link';
	import Copy from 'lucide-svelte/icons/copy';
	import Check from 'lucide-svelte/icons/check';
	import { PUBLIC_HOST } from '$env/static/public';
	import { page } from '$app/stores';

	const url = new URL(PUBLIC_HOST);
	const previewUrl = `${url.protocol}//${$page.data.instance.slug}.${url.host}/events/${data.event.slug}`;
	import EditRegistrationForm from './EditRegistrationForm.svelte';
	import Tags from '$lib/comps/widgets/tags/Tags.svelte';
	import PointPerson from '$lib/comps/widgets/point_person/PointPerson.svelte';

	const attendanceStatus: ['registered', 'attended', 'cancelled', 'noshow'] = [
		'registered',
		'attended',
		'cancelled',
		'noshow'
	];
	const statusOptions = attendanceStatus.map((status) => ({
		value: status,
		label: data.t.events.status[status].title()
	}));

	const attendees = $state(data.attendees.items);

	let isCopied = $state(false);

	function makeStatusOptions(status: (typeof attendanceStatus)[number]) {
		return {
			value: status,
			label: data.t.events.status[status].title()
		};
	}

	function copyEventUrl() {
		navigator.clipboard.writeText(previewUrl);
		isCopied = true;
		setTimeout(() => (isCopied = false), 2000);
	}
</script>

<PageHeader title={data.event.name} separator={false}>
	{#snippet button()}
		<div class="flex items-center gap-1">
			<Button variant="outline" target="_blank" href={previewUrl}
				>{data.t.forms.buttons.preview()}</Button
			>
			<Button href="/events/{data.event.id}/edit">{data.t.forms.buttons.edit()}</Button>
		</div>
	{/snippet}
</PageHeader>
<div class="text-muted-foreground space-y-2 mt-3">
	{#if renderAddress(data.event, data.t, data.instance.country).text.length > 0}<div
			class="flex items-center gap-1.5"
		>
			<MapPin size={16} />
			<a href={renderAddress(data.event, data.t, data.instance.country).url} target="_blank"
				>{renderAddress(data.event, data.t, data.instance.country).text}</a
			>
		</div>{/if}
	<div class="flex items-center gap-1.5">
		<CalendarClock size={16} />
		{formatDateTimeRange(data.event.starts_at, data.event.ends_at)}
	</div>
	<div class="flex items-center gap-1.5">
		<Link size={16} />
		<span class="text-muted-foreground text-sm">
			<span class="text-foreground">{previewUrl}</span>
		</span>
		<button
			class="ml-1 p-1 hover:bg-muted rounded-sm transition-colors duration-200 {isCopied
				? 'text-green-600'
				: ''}"
			title={isCopied
				? data.t.forms.actions.copied_to_clipboard()
				: data.t.forms.buttons.copy_url_to_clipboard()}
			onclick={copyEventUrl}
		>
			{#if isCopied}
				<div class="flex items-center gap-1">
					<Check size={14} />
					<span class="text-xs font-medium">Copied!</span>
				</div>
			{:else}
				<Copy size={14} />
			{/if}
		</button>
	</div>
	{#if data.event.online}
		<div class="flex items-center gap-1.5">
			<Link size={16} />
			<div>
				<a href={data.event.online_url} target="_blank">{data.event.online_url}</a>
				{#if data.event.online_instructions}
					<div class="text-muted-foreground text-xs">
						{data.event.online_instructions}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<div class="flex justify-between items-baseline flex-wrap gap-4">
		<Tags type="events" personOrEventId={data.event.id} />
		<PointPerson type="event" objectId={data.event.id} admin={data.event.point_person}
			>{#snippet header()}{/snippet}</PointPerson
		>
	</div>
</div>
<div class="mt-12">
	<DataGrid title={data.t.pages.events.attendees()} items={attendees} count={data.attendees.count}>
		{#snippet content(attendee: (typeof data.attendees.items)[0], index: number)}
			<div class="flex items-center justify-between gap-4">
				<PersonBadge person={attendee} />
				<EditRegistrationForm
					personId={attendee.person_id}
					status={attendee.status}
					sendNotifications={attendee.send_notifications}
				/>
			</div>
		{/snippet}
		{#snippet headerButton()}
			<Button href="/events/{data.event.id}/register"
				>{data.t.events.attendees.register.title()}</Button
			>
		{/snippet}
	</DataGrid>
</div>
