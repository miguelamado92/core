<script lang="ts">
	import { countTextTemplatePlaceholders } from '$lib/comps/forms/whatsapp/utils';
	import type { TemplateComponentsHeaderImage } from '$lib/schema/communications/whatsapp/elements/template';
	import type { ParametersImage } from '$lib/schema/communications/whatsapp/elements/template_message';
	type Props = {
		component: TemplateComponentsHeaderImage;
		parameters: Array<ParametersImage>;
	};
	const { component = $bindable(), parameters = $bindable([]) }: Props = $props();
</script>

<input bind:value={parameters[0].image.caption} />
<input bind:value={parameters[0].image.id} />
