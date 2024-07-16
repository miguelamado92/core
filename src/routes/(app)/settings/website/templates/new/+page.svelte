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
	import { create } from '$lib/schema/website/templates';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
</script>

<form method="post" use:enhance>
	<Grid cols={1}>
		<H1>{data.t.pages.config.settings.website.templates.new()}</H1>
		<Error error={$message} />

		<Input
			{form}
			name="name"
			label={data.t.forms.fields.generic.name.label()}
			bind:value={$formData.name as string}
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
				{data.t.forms.fields.metatags.header()}
			{/snippet}
			{#if $formData.html_metatags}
				<Grid cols={1}>
					<Input
						{form}
						name="html_metatags.title"
						label={data.t.forms.fields.metatags.title.label()}
						description={data.t.forms.fields.metatags.title.description()}
						bind:value={$formData.html_metatags.title as string}
					/>
					<Textarea
						{form}
						name="html_metatags.description"
						label={data.t.forms.fields.metatags.description.label()}
						description={data.t.forms.fields.metatags.description.description()}
						bind:value={$formData.html_metatags.description as string}
					/>
					<Input
						{form}
						name="html_metatags.subject"
						label={data.t.forms.fields.metatags.subject.label()}
						description={data.t.forms.fields.metatags.subject.description()}
						bind:value={$formData.html_metatags.subject as string}
					/>
					<Input
						{form}
						name="html_metatags.keywords"
						label={data.t.forms.fields.metatags.keywords.label()}
						description={data.t.forms.fields.metatags.keywords.description()}
						bind:value={$formData.html_metatags.keywords as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.title"
						label={data.t.forms.fields.metatags.open_graph.title.label()}
						description={data.t.forms.fields.metatags.open_graph.title.description()}
						bind:value={$formData.html_metatags.openGraph.title as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.description"
						label={data.t.forms.fields.metatags.open_graph.description.label()}
						description={data.t.forms.fields.metatags.open_graph.description.description()}
						bind:value={$formData.html_metatags.openGraph.description as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.description"
						label={data.t.forms.fields.metatags.open_graph.description.label()}
						description={data.t.forms.fields.metatags.open_graph.description.description()}
						bind:value={$formData.html_metatags.openGraph.description as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.image"
						label={data.t.forms.fields.metatags.open_graph.image.label()}
						description={data.t.forms.fields.metatags.open_graph.image.description()}
						bind:value={$formData.html_metatags.openGraph.image as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.image_alt"
						label={data.t.forms.fields.metatags.open_graph.image_alt.label()}
						description={data.t.forms.fields.metatags.open_graph.image_alt.description()}
						bind:value={$formData.html_metatags.openGraph.image_alt as string}
					/>
				</Grid>
			{/if}
		</Collapsible>

		<Collapsible class="mb-4">
			{#snippet trigger()}
				{data.t.forms.fields.custom_code.header()}
			{/snippet}
			{#if $formData.custom_code}
				<Grid cols={1}>
					<Code
						{form}
						name="custom_code.custom_css"
						label={data.t.forms.fields.custom_code.custom_css.label()}
						options={{language: 'css', lineNumbers: true, value: $formData.custom_code.custom_css as string}}
						bind:value={$formData.custom_code.custom_css as string}
					/>
					<Code
						{form}
						name="custom_code.custom_js"
						label={data.t.forms.fields.custom_code.custom_js.label()}
						options={{language: 'js', lineNumbers: true, value: $formData.custom_code.custom_js as string}}
						bind:value={$formData.custom_code.custom_js as string}
					/>
					<Code
						{form}
						name="custom_code.custom_html_head"
						label={data.t.forms.fields.custom_code.custom_html_head.label()}
						bind:value={$formData.custom_code.custom_html_head as string}
					/>
					<Code
						{form}
						name="custom_code.custom_html_body"
						label={data.t.forms.fields.custom_code.custom_html_body.label()}
						bind:value={$formData.custom_code.custom_html_body as string}
					/>
				</Grid>
			{/if}
		</Collapsible>

		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={$formData} />
	</Grid>
</form>
