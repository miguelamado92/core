<script>
	import { page } from '$app/stores';
	import H3 from '$lib/comps/typography/H3.svelte';
	export let data;
	import * as Card from '$lib/comps/ui/card';
	import * as Form from '$lib/comps/ui/form';
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
	import { secrets } from '$lib/schema/core/instance';
	const form = superForm(data.form, {
		validators: valibotClient(secrets),
		dataType: 'json'
	});
	const { form: formData, enhance } = form;

	function updateWhatsappKey() {}
</script>

<Grid cols={1}>
	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>{$page.data.t.pages.config.settings.secrets.index()}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Grid>
				<form method="post" use:enhance class="grid grid-cols-1 gap-4 mt-6">
					<Grid cols={1}>
						<H3>{$page.data.t.pages.config.settings.secrets.whatsapp_default_key.index()}</H3>
						<Input
							{form}
							name="WHATSAPP_ACCESS_KEY"
							bind:value={$formData.WHATSAPP_ACCESS_KEY}
							label="WhatsApp Access Key"
						/>
						<Debug data={$formData} />
					</Grid>
					<Button
						type="button"
						variant="outline"
						size="sm"
						class="mt-2"
						on:click={updateWhatsappKey}
					>
						Update access key
					</Button>
				</form>

				<Form.Button>Update secrets</Form.Button>
			</Grid>
		</Card.Content>
	</Card.Root>
</Grid>
