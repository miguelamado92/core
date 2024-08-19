<script lang="ts">
	export let data;
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
	import { renderAddress } from '$lib/utils/text/address';
	import { formatDateTimeRange, formatDate } from '$lib/utils/text/date';
	import * as Select from '$lib/comps/ui/select';
	import Checkbox from '$lib/comps/ui/checkbox/checkbox.svelte';
	import Label from '$lib/comps/ui/label/label.svelte';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import CalendarClock from 'lucide-svelte/icons/calendar-clock';
	import Link from 'lucide-svelte/icons/link';
	import { PUBLIC_HOST } from '$env/static/public';
	import { page } from '$app/stores';
	const url = new URL(PUBLIC_HOST);
	const previewUrl = `${url.protocol}//${$page.data.instance.slug}.${url.host}/events/${data.event.slug}`;

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

	function makeStatusOptions(status: (typeof attendanceStatus)[number]) {
		return {
			value: status,
			label: data.t.events.status[status].title()
		};
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
	{#if renderAddress(data.event, data.t).text.length > 0}<div class="flex items-center gap-1.5">
			<MapPin size={16} />
			<a href={renderAddress(data.event, data.t).url} target="_blank"
				>{renderAddress(data.event, data.t).text}</a
			>
		</div>{/if}
	<div class="flex items-center gap-1.5">
		<CalendarClock size={16} />
		{formatDateTimeRange(data.event.starts_at, data.event.ends_at)}
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
	<DataGrid
		title={data.t.pages.events.attendees()}
		items={data.attendees.items}
		count={data.attendees.count}
	>
		{#snippet content(attendee: typeof data.attendees.items[0])}
			<div class="flex items-center justify-between gap-4">
				<PersonBadge person={attendee} />

				<div>
					<form method="post" class="flex items-center gap-2">
						<Label>{data.t.forms.fields.events.attendees.send_notifications.label()}</Label>
						<Checkbox bind:checked={attendee.send_notifications} />
						<input name="send_notifications" value={attendee.send_notifications} hidden />
						<Select.Root
							portal={null}
							items={statusOptions}
							selected={makeStatusOptions(attendee.status)}
							onSelectedChange={(v) => {
								v && (attendee.status = v.value);
							}}
						>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Status" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each statusOptions as status}
										<Select.Item value={status.value} label={status.label}
											>{status.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name="status" />
						</Select.Root>
						<input name="status" value={attendee.status} hidden />
						<input name="person_id" value={attendee.person_id} hidden />
						<Button type="submit" variant="outline">{data.t.forms.buttons.update()}</Button>
					</form>
				</div>
			</div>
		{/snippet}
		{#snippet headerButton()}
			<Button href="/events/{data.event.id}/register"
				>{data.t.events.attendees.register.title()}</Button
			>
		{/snippet}
	</DataGrid>
</div>
