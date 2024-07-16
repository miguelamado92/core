<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { page } from '$app/stores';
	import {
		Button,
		Error,
		Select,
		Grid,
		Debug,
		superForm,
		valibotClient,
		type Infer
	} from '$lib/comps/ui/forms';
	import { type SuperValidated } from 'sveltekit-superforms';
	import { update } from '$lib/schema/core/instance';
	import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '$lib/i18n';
	const items: { value: SupportedLanguage; label: string }[] = [
		{ value: 'en', label: 'English' },
		{ value: 'ja', label: '日本語' },
		{ value: 'pt', label: 'Português' },
		{ value: 'es', label: 'Español' },
		{ value: 'fr', label: 'Français' },
		{ value: 'sw', label: 'Kiswahili' },
		{ value: 'th', label: 'ไทย' },
		{ value: 'zh', label: '中文' }
	];
	const selected = items.find((o) => o.value === $page.data.instance.language);

	type Props = {
		superform: SuperValidated<Infer<typeof update>>;
	};
	const { superform }: Props = $props();

	const form = superForm(superform, {
		validators: valibotClient(update),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
</script>

<form method="post" use:enhance>
	<Grid cols={1}>
		<Error error={$message}></Error>
		<div class="flex items-center gap-4">
			<div class="flex-grow">
				<Select
					label={$page.data.t.forms.fields.settings.language.choose_language.label()}
					{form}
					name="language"
					options={items}
					bind:value={$formData.language as string}
				/>
			</div>
			<Button type="submit" class="mt-3" />
		</div>
		<Debug data={$formData}></Debug>
	</Grid>
</form>
