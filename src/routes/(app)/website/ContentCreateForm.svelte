<script lang="ts">
	import { page } from '$app/stores';
	import {
		superForm,
		Input,
		valibotClient,
		Debug,
		Code,
		Textarea,
		Button,
		Error,
		Grid,
		HTML
	} from '$lib/comps/ui/forms';
	import { create, update } from '$lib/schema/website/content';
	import Collapsible from '$lib/comps/ui/custom/collapsible/collapsible.svelte';
	const { isCreate }: { isCreate: boolean } = $props();
	const form = superForm($page.data.form, {
		validators: valibotClient(isCreate ? create : update),
		dataType: 'json'
	});
	const { form: formData, message, enhance } = form;
</script>

<form method="post" use:enhance>
	<Grid cols={1}>
		<Error error={$message} />
		<Grid cols={2}>
			<Input
				{form}
				name="name"
				label={$page.data.t.forms.fields.generic.name.label()}
				bind:value={$formData.name}
			/>

			<Input
				{form}
				name="slug"
				label={$page.data.t.forms.fields.generic.slug.label()}
				description={$page.data.t.forms.fields.generic.slug.description()}
				bind:value={$formData.slug}
			/>
		</Grid>
		<Input
			{form}
			name="heading"
			label={$page.data.t.forms.fields.generic.page_heading.label()}
			bind:value={$formData.heading}
		/>

		<HTML
			{form}
			name="html"
			label={$page.data.t.forms.fields.generic.html.label()}
			bind:value={$formData.html}
		/>
		<Collapsible class="mb-4">
			{#snippet trigger()}
				{$page.data.t.forms.fields.metatags.header()}
			{/snippet}
			{#if $formData.html_metatags}
				<Grid cols={1}>
					<Input
						{form}
						name="html_metatags.title"
						label={$page.data.t.forms.fields.metatags.title.label()}
						description={$page.data.t.forms.fields.metatags.title.description()}
						bind:value={$formData.html_metatags.title as string}
					/>
					<Textarea
						{form}
						name="html_metatags.description"
						label={$page.data.t.forms.fields.metatags.description.label()}
						description={$page.data.t.forms.fields.metatags.description.description()}
						bind:value={$formData.html_metatags.description as string}
					/>
					<Input
						{form}
						name="html_metatags.subject"
						label={$page.data.t.forms.fields.metatags.subject.label()}
						description={$page.data.t.forms.fields.metatags.subject.description()}
						bind:value={$formData.html_metatags.subject as string}
					/>
					<Input
						{form}
						name="html_metatags.keywords"
						label={$page.data.t.forms.fields.metatags.keywords.label()}
						description={$page.data.t.forms.fields.metatags.keywords.description()}
						bind:value={$formData.html_metatags.keywords as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.title"
						label={$page.data.t.forms.fields.metatags.open_graph.title.label()}
						description={$page.data.t.forms.fields.metatags.open_graph.title.description()}
						bind:value={$formData.html_metatags.openGraph.title as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.description"
						label={$page.data.t.forms.fields.metatags.open_graph.description.label()}
						description={$page.data.t.forms.fields.metatags.open_graph.description.description()}
						bind:value={$formData.html_metatags.openGraph.description as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.description"
						label={$page.data.t.forms.fields.metatags.open_graph.description.label()}
						description={$page.data.t.forms.fields.metatags.open_graph.description.description()}
						bind:value={$formData.html_metatags.openGraph.description as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.image"
						label={$page.data.t.forms.fields.metatags.open_graph.image.label()}
						description={$page.data.t.forms.fields.metatags.open_graph.image.description()}
						bind:value={$formData.html_metatags.openGraph.image as string}
					/>
					<Input
						{form}
						name="html_metatags.openGraph.image_alt"
						label={$page.data.t.forms.fields.metatags.open_graph.image_alt.label()}
						description={$page.data.t.forms.fields.metatags.open_graph.image_alt.description()}
						bind:value={$formData.html_metatags.openGraph.image_alt as string}
					/>
				</Grid>
			{/if}
		</Collapsible>

		<Collapsible class="mb-4">
			{#snippet trigger()}
				{$page.data.t.forms.fields.custom_code.header()}
			{/snippet}
			{#if $formData.custom_code}
				<Grid cols={1}>
					<Code
						{form}
						name="custom_code.custom_css"
						label={$page.data.t.forms.fields.custom_code.custom_css.label()}
						options={{language: 'css', lineNumbers: true, value: $formData.custom_code.custom_css as string}}
						bind:value={$formData.custom_code.custom_css as string}
					/>
					<Code
						{form}
						name="custom_code.custom_js"
						label={$page.data.t.forms.fields.custom_code.custom_js.label()}
						options={{language: 'js', lineNumbers: true, value: $formData.custom_code.custom_js as string}}
						bind:value={$formData.custom_code.custom_js as string}
					/>
					<Code
						{form}
						name="custom_code.custom_html_head"
						label={$page.data.t.forms.fields.custom_code.custom_html_head.label()}
						bind:value={$formData.custom_code.custom_html_head as string}
					/>
					<Code
						{form}
						name="custom_code.custom_html_body"
						label={$page.data.t.forms.fields.custom_code.custom_html_body.label()}
						bind:value={$formData.custom_code.custom_html_body as string}
					/>
				</Grid>
			{/if}
		</Collapsible>
		<Button></Button>
		<Debug data={$formData} />
	</Grid>
</form>
