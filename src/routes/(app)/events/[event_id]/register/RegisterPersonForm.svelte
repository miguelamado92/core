<script lang="ts">
	import { page } from '$app/stores';
	export let person_id: number;
	export let eventIsPast: boolean = false;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Label from '$lib/comps/ui/label/label.svelte';
	import * as Select from '$lib/comps/ui/select';
	import { Checkbox } from '$lib/comps/ui/checkbox';

	const attendanceStatus: ['registered', 'attended', 'cancelled', 'noshow'] = [
		'registered',
		'attended',
		'cancelled',
		'noshow'
	];
	const statusOptions = attendanceStatus.map((status) => ({
		value: status,
		label: $page.data.t.events.status[status].title()
	}));

	const defaultSelected = eventIsPast ? statusOptions[1] : statusOptions[0];
	let sendNotifications: boolean = true;
	let selectedStatus = defaultSelected.value;
</script>

<form method="post">
	<div class="flex items-center gap-2">
		<input type="hidden" name="person_id" value={person_id} />
		<input type="hidden" name="send_notifications" value={sendNotifications} />
		<input type="hidden" name="status" value={selectedStatus} />
		<Select.Root
			portal={null}
			items={statusOptions}
			selected={defaultSelected}
			onSelectedChange={(v) => {
				v && (selectedStatus = v.value);
			}}
		>
			<Label>{$page.data.t.forms.fields.events.attendees.send_notifications.label()}</Label>
			<Checkbox bind:checked={sendNotifications} />
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Status" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each statusOptions as status}
						<Select.Item value={status.value} label={status.label}>{status.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="status" />
		</Select.Root>
		<Button type="submit">Register</Button>
	</div>
</form>
