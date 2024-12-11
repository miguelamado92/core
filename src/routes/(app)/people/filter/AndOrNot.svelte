<script lang="ts">
	type Logic = 'AND' | 'OR' | 'NOT';
	let { logic = $bindable() }: { logic: Logic } = $props();
	import * as Select from '$lib/comps/ui/select';
	import { page } from '$app/stores';
	const selectOptions = [
		{ value: 'AND', label: $page.data.t.forms.fields.filters.boolean_logic.AND() },
		{ value: 'OR', label: $page.data.t.forms.fields.filters.boolean_logic.OR() },
		{ value: 'NOT', label: $page.data.t.forms.fields.filters.boolean_logic.NOT() }
	];
	let selected = $derived(selectOptions.find((option) => option.value === logic));
	function logicTypeGuard(input: unknown): input is Logic {
		return ['AND', 'OR', 'NOT'].includes(input as string);
	}
</script>

<Select.Root
	type="single"
	items={selectOptions}
	value={selected?.value}
	onValueChange={(val) => {
		if (!val) return;
		if (logicTypeGuard(val)) logic = val;
	}}
>
	<Select.Trigger class="w-[180px]">
		{selected?.label || '[Options]'}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each selectOptions as option}
				<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
