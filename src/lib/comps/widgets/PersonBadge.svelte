<script lang="ts">
	import { page } from '$app/stores';
	import type { Read, List } from '$lib/schema/people/people';
	import type { ViewBase as EventAttendee } from '$lib/schema/events/attendees';
	import type { ViewBase as PetitionSignature } from '$lib/schema/petitions/signatures';
	const {
		person,
		linkToProfile = false
	}: {
		linkToProfile?: boolean;
		person: Read | List['items'][number] | EventAttendee | PetitionSignature;
	} = $props();
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import { renderName } from '$lib/utils/text/names';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import Whatsapp from '$lib/comps/icons/whatsapp.svelte';
	const person_id: number | undefined = 'person_id' in person ? person.person_id : person.id;
</script>

<div class="flex items-center gap-2">
	<Avatar profile_picture_url={null} full_name={renderName(person, $page.data.instance.country)} />
	<div class="justify-start w-full">
		<div class="font-medium">
			{#if linkToProfile}
				<a href="/people/{person_id}">{renderName(person, $page.data.instance.country)}</a>
			{:else}
				{renderName(person, $page.data.instance.country)}
			{/if}
		</div>
		<div class="text-muted-foreground font-light flex items-center gap-2">
			{#if person.email?.contactable}
				<Mail class="w-4 h-4" />
			{/if}
			{#if person.phone_number?.contactable}
				<Phone class="w-4 h-4" />
			{/if}
			{#if person.phone_number?.whatsapp}
				<Whatsapp class="w-4 h-4" />
			{/if}
		</div>
	</div>
</div>
