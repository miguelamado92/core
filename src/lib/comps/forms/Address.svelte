<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { page } from '$app/stores';
	import {
		formFieldProxy,
		type SuperForm,
		type FormPathLeaves,
		type FormFieldProxy
	} from 'sveltekit-superforms';

	import type { SupportedCountry } from '$lib/i18n';

	type Props = {
		form: SuperForm<T>;
		address_line_1: FormPathLeaves<T>;
		address_line_2: FormPathLeaves<T>;
		address_line_3: FormPathLeaves<T>;
		address_line_4: FormPathLeaves<T>;
		locality: FormPathLeaves<T>;
		state: FormPathLeaves<T>;
		postcode: FormPathLeaves<T>;
		country: FormPathLeaves<T>;
	};
	let {
		form,
		address_line_1,
		address_line_2,
		address_line_3,
		address_line_4,
		locality,
		state,
		postcode,
		country
	}: Props = $props();

	let { value: addressLine1Value } = formFieldProxy(form, address_line_1);
	let { value: addressLine2Value } = formFieldProxy(form, address_line_2);
	let { value: addressLine3Value } = formFieldProxy(form, address_line_3);
	let { value: addressLine4Value } = formFieldProxy(form, address_line_4);
	let { value: localityValue } = formFieldProxy(form, locality);
	let { value: stateValue } = formFieldProxy(form, state);
	let { value: postcodeValue } = formFieldProxy(form, postcode);
	let { value: countryValue } = formFieldProxy(form, country);

	import { Input, Grid } from '$lib/comps/ui/forms';
</script>

<Grid cols={1}>
	<Grid cols={2}>
		<Input
			type="text"
			{form}
			name={address_line_1}
			bind:value={$addressLine1Value as string}
			label={$page.data.t.forms.fields.address.address_line_1.label()}
		/>
		<Input
			type="text"
			{form}
			name={address_line_2}
			bind:value={$addressLine2Value as string}
			label={$page.data.t.forms.fields.address.address_line_2.label()}
		/>
	</Grid>
	<Grid cols={3}>
		<Input
			type="text"
			{form}
			name={locality}
			bind:value={$localityValue as string}
			label={$page.data.t.forms.fields.address.locality.label()}
		/>
		<Input
			type="text"
			{form}
			name={state}
			bind:value={$stateValue as string}
			label={$page.data.t.forms.fields.address.state.label()}
		/>
		<Input
			type="text"
			{form}
			name={postcode}
			bind:value={$postcodeValue as string}
			label={$page.data.t.forms.fields.address.postcode.label()}
		/>
	</Grid>
</Grid>
