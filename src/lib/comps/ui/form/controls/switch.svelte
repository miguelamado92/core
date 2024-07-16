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
	export let disabled: boolean | undefined = false;
	// Everything above this can be copied

	import Switch from '$lib/comps/ui/switch/switch.svelte';
	export let checked: boolean;
</script>

<Form.Field {form} {name}>
	<Form.Control let:attrs {...$$restProps}>
		<!-- Start form control block -->
		<label
			for={attrs.id}
			class={cn('flex flex-row items-center justify-between rounded-lg border p-4', className)}
		>
			<div class="space-y-0.5">
				{#if label}<Form.Label>{label}</Form.Label>{/if}
				{#if description}<Form.Description>{description}</Form.Description>{/if}
			</div>
			<Switch includeInput {...attrs} bind:checked {disabled} />
		</label>
		<Form.FieldErrors />
		<!-- End control block -->
	</Form.Control>
</Form.Field>
