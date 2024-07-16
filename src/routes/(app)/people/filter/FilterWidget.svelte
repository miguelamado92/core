<script lang="ts">
	import { type FilterType } from '$lib/schema/people/filters/filters';
	let { filter = $bindable(), onDelete }: { filter: FilterType; onDelete: () => void } = $props();
	import Button from '$lib/comps/ui/button/button.svelte';
	import X from 'lucide-svelte/icons/x';

	import TypeSelector from './types/TypeSelector.svelte';
	import Email from './types/Email.svelte';
	import FullName from './types/FullName.svelte';
	import PhoneNumber from './types/PhoneNumber.svelte';
	import Postcode from './types/Postcode.svelte';
	import Locality from './types/Locality.svelte';
	import State from './types/State.svelte';
	import Address from './types/Address.svelte';
	import InList from './types/InList.svelte';
	import NotInList from './types/NotInList.svelte';
	import HasTag from './types/HasTag.svelte';
	import NotHasTag from './types/NotHasTag.svelte';
	import RegisteredEvent from './types/RegisteredEvent.svelte';
	import NotRegisteredEvent from './types/NotRegisteredEvent.svelte';
</script>

<div>
	<div class="flex items-center gap-4 mt-4 flex-wrap px-4">
		<div class="flex items-center -ml-4">
			<Button onclick={onDelete} size="sm" variant="ghost">
				<X size={14} />
			</Button>
			{@render typeSelector()}
		</div>
		<div class="flex-grow pr-4">
			{#if filter.type === 'full_name'}<FullName bind:item={filter} />{/if}
			{#if filter.type === 'email'}<Email bind:item={filter} />{/if}
			{#if filter.type === 'phone_number'}<PhoneNumber bind:item={filter} />{/if}
			{#if filter.type === 'address'}<Address bind:item={filter} />{/if}
			{#if filter.type === 'postcode'}<Postcode bind:item={filter} />{/if}
			{#if filter.type === 'locality'}<Locality bind:item={filter} />{/if}
			{#if filter.type === 'state'}<State bind:item={filter} />{/if}
			{#if filter.type === 'in_list'}<InList bind:item={filter} />{/if}
			{#if filter.type === 'not_in_list'}<NotInList bind:item={filter} />{/if}
			{#if filter.type === 'has_tag'}<HasTag bind:item={filter} />{/if}
			{#if filter.type === 'not_has_tag'}<NotHasTag bind:item={filter} />{/if}
			{#if filter.type === 'registered_event'}<RegisteredEvent bind:item={filter} />{/if}
			{#if filter.type === 'not_registered_event'}<NotRegisteredEvent bind:item={filter} />{/if}
		</div>
	</div>
</div>

{#snippet typeSelector()}
	<TypeSelector bind:value={filter.type} />
{/snippet}
