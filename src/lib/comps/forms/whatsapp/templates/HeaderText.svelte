<script lang="ts">
	import { countTextTemplatePlaceholders } from '$lib/comps/forms/whatsapp/utils';
	import type { TemplateComponentsHeaderText } from '$lib/schema/communications/whatsapp/elements/template';
	import type { ParametersText } from '$lib/schema/communications/whatsapp/elements/template_message';
	type Props = {
		component: TemplateComponentsHeaderText;
		parameters: Array<ParametersText>;
	};
	const { component = $bindable(), parameters = $bindable([]) }: Props = $props();
	const placeholderCount = countTextTemplatePlaceholders(component.text);
	if (parameters.length === 0) {
		for (let i = 0; i < placeholderCount; i++) {
			parameters.push({ type: 'text', text: `{{${i + 1}}}` });
		}
	}
</script>

{#each parameters as parameter, i}
	<input bind:value={parameters[i].text} />
{/each}
