<script lang="ts">
	import type {
		TemplateComponentsHeaderImage,
		TemplateComponentsHeaderLocation,
		TemplateComponentsHeaderText
	} from '$lib/schema/communications/whatsapp/elements/template';
	import type {
		HeaderParams,
		ParametersText
	} from '$lib/schema/communications/whatsapp/elements/template_message';
	type Props = {
		component:
			| TemplateComponentsHeaderImage
			| TemplateComponentsHeaderLocation
			| TemplateComponentsHeaderText;
		parameters: HeaderParams[];
	};
	let { component = $bindable(), parameters = $bindable([]) }: Props = $props();
	import HeaderText from '$lib/comps/forms/whatsapp/templates/HeaderText.svelte';
</script>

{#if component.format === 'TEXT'}
	<HeaderText bind:component bind:parameters={parameters as ParametersText[]} />
{/if}
{#if component.format === 'IMAGE'}
	<div class="rounded-t-lg cover w-full">
		<img
			src="https://placehold.it/400x300"
			class="rounded-t-lg object-cover max-h-screen"
			alt="Placeholder"
		/>
	</div>
{/if}
{#if component.format === 'VIDEO'}
	<div class="rounded-t-lg cover w-full">
		<img
			src="https://placehold.it/400x300"
			class="rounded-t-lg object-cover max-h-screen"
			alt="Video thumbnail placeholder"
		/>
	</div>
{/if}
