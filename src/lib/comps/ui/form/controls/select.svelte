<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { type SuperForm, type FormPath } from 'sveltekit-superforms';
	export let form: SuperForm<T>;
	export let name: FormPath<T>;
	import * as Form from '$lib/comps/ui/form';
	export let label: string | null;
	export let description: string | null = null;
	import { cn } from '$lib/utils';
	let className = '';
	export { className as class };
	// Everything above this can be copied

	import { page } from '$app/stores';
	import * as Select from '$lib/comps/ui/select';
	export let value: string;
	export let placeholder: string = $page.data.t.forms.generic.select.placeholder();

	export let options: { label: string; value: string }[] = [];
	$: currentOption = options.find((option) => option.value === value);

	$: selectedItem = value
		? {
				label: currentOption?.label,
				value: value
			}
		: undefined;
</script>

<Form.Field {form} {name}>
	<Form.Control let:attrs>
		<!-- Start form control block -->
		<div class="flex flex-col gap-2">
			{#if label}<Form.Label>{label}</Form.Label>{/if}
			<Select.Root
				selected={selectedItem}
				onSelectedChange={(v) => {
					v && (value = v.value);
				}}
			>
				<Select.Trigger {...attrs} class={cn('focus-visible:border-2', className)}>
					<Select.Value {placeholder} />
				</Select.Trigger>
				<Select.Content>
					{#each options as option}
						<Select.Item value={option.value} label={option.label} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value name={attrs.name} />
		</div>
		{#if description}<Form.Description>{description}</Form.Description>{/if}
		<!-- End control block -->
		<Form.FieldErrors />
	</Form.Control>
</Form.Field>
