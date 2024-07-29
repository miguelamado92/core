<script lang="ts">
	import { countTextTemplatePlaceholders } from '$lib/comps/forms/whatsapp/utils';
	import { type Read } from '$lib/schema/communications/whatsapp/template';
	type Props = {
		selected: boolean;
		template: Read | undefined;
	};
	let { selected = $bindable(), template = $bindable() }: Props = $props();
	import Preview from '$lib/comps/forms/whatsapp/templates/preview.svelte';
</script>

<div class="flex gap-4 items-baseline">
	<div class="w-full lg:w-1/2">
		<button onclick={() => (selected = true)}><Preview {selected} {template} /></button>
	</div>
	{#if selected && template}
		<div class="w-full lg:w-1/2">
			<div class="grid grid-cols-1">
				{#each template?.message.components as component}
					{JSON.stringify(component)}
				{/each}
			</div>
		</div>
	{/if}
</div>
