<script lang="ts">
	let { data } = $props();
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import H1 from '$lib/comps/typography/H1.svelte';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import Tags from '$lib/comps/widgets/tags/Tags.svelte';
	import PointPerson from '$lib/comps/widgets/point_person/PointPerson.svelte';
	import { renderAddress } from '$lib/utils/text/address';
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';

	//icons
	import Check from 'lucide-svelte/icons/check';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import Interaction from '$lib/comps/widgets/interactions/Interaction.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { parse } from '$lib/schema/valibot';
	import { list as listParseSchema } from '$lib/schema/people/interactions';
	import LogInteraction from '$lib/comps/widgets/interactions/LogInteraction.svelte';
	let timer: null | ReturnType<typeof setInterval> = $state(null);
	onMount(() => {
		document.querySelector('#bottom')?.scrollIntoView({ behavior: 'smooth' });
		timer = setInterval(async () => {
			const result = await fetch(`/api/v1/people/${data.person.id}/interactions`);
			if (result.ok) {
				const body = await result.json();
				const parsed = parse(listParseSchema, body);
				data.person.interactions = parsed;
			}
		}, 30000);
	});
	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	function handleAddInteraction(interaction: (typeof data.person.interactions)[0]) {
		const parsed = parse(listParseSchema.item, interaction);
		data.person.interactions = [parsed, ...data.person.interactions];
		setTimeout(
			() => document.querySelector('#bottom')?.scrollIntoView({ behavior: 'smooth' }),
			100
		);
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

<div class="text-muted-foreground space-y-2 mt-3">
	{#if renderAddress(data.person).text.length > 0}
		<div class="flex items-center gap-1.5">
			<MapPin size={18} />
			<a href={renderAddress(data.person).url} target="_blank">{renderAddress(data.person).text}</a>
		</div>
	{/if}

	{#if data.person.email}
		<div class="flex items-center gap-1.5">
			<Mail size={18} />
			<div>{data.person.email.email}</div>
			{#if data.person.email.subscribed}<Badge class="gap-1 bg-success-600 hover:bg-success-600"
					><Check size={12} />{data.t.common.status.subscribed()}</Badge
				>{/if}
		</div>
	{/if}

	{#if data.person.phone_number}
		<div class="flex items-center gap-1.5">
			<Phone size={18} />
			<div>{data.person.phone_number.phone_number}</div>
			{#if data.person.phone_number.subscribed}
				<Badge class="gap-1 bg-success-600 hover:bg-success-600"
					><Check size={12} />{data.t.common.status.subscribed()}</Badge
				>
			{/if}
		</div>
	{/if}

	<div class="flex justify-between items-baseline flex-wrap gap-4">
		<Tags type="people" personOrEventId={data.person.id} />
		<PointPerson type="person" objectId={data.person.id} admin={data.person.point_person}
			>{#snippet header()}{/snippet}</PointPerson
		>
	</div>
</div>

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
