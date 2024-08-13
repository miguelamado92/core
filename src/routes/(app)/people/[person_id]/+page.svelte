<script lang="ts">
	let { data } = $props();
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import H1 from '$lib/comps/typography/H1.svelte';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';

	import PersonInfo from './PersonInfo.svelte';

	import Interaction from '$lib/comps/widgets/interactions/Interaction.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { parse } from '$lib/schema/valibot';
	import { list as listParseSchema } from '$lib/schema/people/interactions';
	import LogInteraction from '$lib/comps/widgets/interactions/LogInteraction.svelte';
	let timer: null | ReturnType<typeof setInterval> = $state(null);
	async function fetchLatestInteractions() {
		const result = await fetch(
			`/api/v1/people/${data.person.id}/interactions?display=communications`
		);
		if (result.ok) {
			const body = await result.json();
			const parsed = parse(listParseSchema, body);
			data.person.interactions = parsed;
		}
	}

	onMount(() => {
		document.querySelector('#bottom')?.scrollIntoView({ behavior: 'smooth' });
		timer = setInterval(async () => await fetchLatestInteractions(), 30000);
	});
	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	async function handleAddInteraction(
		interaction: (typeof data.person.interactions)[0] | undefined
	) {
		if (interaction) {
			const parsed = parse(listParseSchema.item, interaction);
			data.person.interactions = [parsed, ...data.person.interactions];
		}
		setTimeout(async () => {
			await fetchLatestInteractions();
			document.querySelector('#bottom')?.scrollIntoView({ behavior: 'smooth' });
		}, 1000);
	}
	let interactionsArray = $derived(data.person.interactions.toReversed());
</script>

<PageHeader title={data.person.full_name} separator={false}>
	{#snippet headerSnippet()}
		<div class="flex items-center gap-2">
			<Avatar
				class="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
				textClass="md:text-xl md:font-medium lg:text-2xl lg:font-bold"
				profile_picture_url={null}
				full_name={data.person.full_name}
			/>
			<H1>{data.person.full_name}</H1>
		</div>
	{/snippet}
	{#snippet button()}
		<Button href={`/people/${data.person.id}/edit`} variant="default" size="sm">
			{data.t.forms.buttons.edit()}
		</Button>
	{/snippet}
</PageHeader>

<PersonInfo person={data.person} />

<Separator class="mt-6" />
<div class="relative">
	<!-- Component Start -->
	<div
		class="flex flex-col flex-grow w-full h-[700px] overflow-hidden rounded-b-xl bg-white shadow-lg border-l border-r"
	>
		<div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
			{#each interactionsArray as interaction, i}
				<Interaction person={data.person} {interaction} />
			{/each}
			<div id="bottom"></div>
		</div>

		<LogInteraction personId={data.person.id} onLogged={handleAddInteraction} />
	</div>
</div>
