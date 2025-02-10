<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/messages';
	type Props = {
		messages: Read[];
		index: number;
	};
	let { index, messages = $bindable() }: Props = $props();
	import Textarea from '$lib/comps/ui/textarea/textarea.svelte';
	import Label from '$lib/comps/ui/label/label.svelte';
	import * as textActions from '$lib/comps/forms/whatsapp/messages/builder/actions/text';
	const startingMessage = textActions.extractText(messages[index].message);
</script>

<Label>Content</Label>
<Textarea
	value={startingMessage}
	oninput={(ev) => {
		if ('target' in ev && ev.target) {
			if ('value' in ev.target && ev.target.value) {
				if (typeof ev.target.value === 'string') {
					messages[index] = {
						...messages[index],
						message: textActions.setText(messages[index].message, ev.target.value)
					};
				}
			}
		}
	}}
	class="w-full text-foreground"
/>
