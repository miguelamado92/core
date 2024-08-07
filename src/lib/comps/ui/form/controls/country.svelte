<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { page } from '$app/stores';
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

	import * as Select from '$lib/comps/ui/select';
	export let value: string;
	export let placeholder: string = $page.data.t.forms.generic.country.placeholder();

	import { SUPPORTED_COUNTRIES } from '$lib/i18n';

	const options = SUPPORTED_COUNTRIES.map((country) => ({
		value: country,
		label: $page.data.t.countries[country]()
	}));

	$: selectedItem = SUPPORTED_COUNTRIES.includes(value as (typeof SUPPORTED_COUNTRIES)[number])
		? {
				label: $page.data.t.countries[value as (typeof SUPPORTED_COUNTRIES)[number]](), //this is fine, because we're already checking...
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
				<Select.Trigger {...attrs} class={cn('focus-visible:border-2 ', className)}>
					{#if selectedItem}
						<div class="flex items-center gap-2 justify-start">
							{$page.data.t.flags[value as (typeof SUPPORTED_COUNTRIES)[number]]()}
							<Select.Value {placeholder} />
						</div>
					{:else}
						<Select.Value {placeholder} />
					{/if}
				</Select.Trigger>
				<Select.Content>
					{#each options as option}
						<Select.Item value={option.value} label={option.label} class="flex items-center gap-1">
							<div>
								{$page.data.t.flags[option.value as (typeof SUPPORTED_COUNTRIES)[number]]()}
							</div>
							<div>{option.label}</div>
						</Select.Item>
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
