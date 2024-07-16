<script lang="ts">
	import { page } from '$app/stores';
	import { type FilterType } from '$lib/schema/people/filters/filters';
	let { value = $bindable() }: { value: FilterType['type'] } = $props();
	import * as Select from '$lib/comps/ui/select/';
	const items: { value: FilterType['type']; label: string }[] = [
		{ value: 'full_name', label: 'Full Name' },
		{ value: 'email', label: 'Email address' },
		{ value: 'postcode', label: 'Postcode' },
		{ value: 'locality', label: 'Locality' },
		{ value: 'state', label: 'State' },
		{ value: 'address', label: 'Address' },
		{ value: 'phone_number', label: 'Phone number' },
		{ value: 'in_list', label: 'List member' },
		{ value: 'not_in_list', label: 'Not list member' },
		{ value: 'has_tag', label: 'Has tag' },
		{ value: 'not_has_tag', label: 'Does not have tag' },
		{ value: 'registered_event', label: 'Registered for event' },
		{ value: 'not_registered_event', label: 'Not registered for event' }
	];
	const selected = items[0];
</script>

<Select.Root
	{items}
	{selected}
	onSelectedChange={(val) => {
		if (!val) return;
		value = val.value;
	}}
>
	<Select.Trigger class="md:w-[175px] w-full">
		<Select.Value placeholder={$page.data.t.forms.fields.filters.filter_type.placeholder()} />
	</Select.Trigger>
	<Select.Content>
		{#each items as item}
			<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
