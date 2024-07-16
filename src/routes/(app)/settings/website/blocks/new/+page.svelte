<script lang="ts">
	export let data;
	import H1 from '$lib/comps/typography/H1.svelte';
	import Collapsible from '$lib/comps/ui/custom/collapsible/collapsible.svelte';

	import {
		superForm,
		valibotClient,
		Input,
		Button,
		Textarea,
		Grid,
		Checkbox,
		Debug,
		Code,
		HTML,
		Error
	} from '$lib/comps/ui/forms';
	import { create } from '$lib/schema/website/blocks';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
</script>

<form method="post" use:enhance>
	<Grid cols={1}>
		<H1>{data.t.pages.config.settings.website.blocks.new()}</H1>
		<Error error={$message} />

		<Input
			{form}
			name="name"
			label={data.t.forms.fields.generic.name.label()}
			bind:value={$formData.name as string}
		/>

		<Input
			{form}
			name="slug"
			label={data.t.forms.fields.generic.slug.label()}
			description={data.t.forms.fields.generic.slug.description()}
			bind:value={$formData.slug as string}
		/>

		<Textarea
			{form}
			name="description"
			label={data.t.forms.fields.generic.description.label()}
			bind:value={$formData.description as string}
		/>
		<HTML
			{form}
			name="html"
			label={data.t.forms.fields.generic.html.label()}
			description={null}
			bind:value={$formData.html as string}
		/>

		<Collapsible class="mb-4">
			{#snippet trigger()}
				{data.t.forms.fields.custom_code.header()}
			{/snippet}
			<Grid cols={1}>
				<Code
					{form}
					name="custom_css"
					label={data.t.forms.fields.custom_code.custom_css.label()}
					options={{language: 'css', lineNumbers: true, value: $formData.custom_css as string}}
					bind:value={$formData.custom_css as string}
				/>
				<Code
					{form}
					name="custom_js"
					label={data.t.forms.fields.custom_code.custom_js.label()}
					options={{language: 'js', lineNumbers: true, value: $formData.custom_js as string}}
					bind:value={$formData.custom_js as string}
				/>
			</Grid>
		</Collapsible>

		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={$formData} />
	</Grid>
</form>
