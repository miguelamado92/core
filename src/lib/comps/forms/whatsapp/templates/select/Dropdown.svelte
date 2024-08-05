<script lang="ts">
	import { page } from '$app/stores';
	import { type List } from '$lib/schema/communications/whatsapp/template';
	import { debounce } from '$lib/utils';
	type Props = {
		item?: List['items'][number];
		items?: List['items'];
		value?: number;
		onselect: (item: List['items'][number]) => void;
	};
	let {
		item = $bindable(),
		value = $bindable(),
		items = $bindable([]),
		onselect
	}: Props = $props();
	let loading = $state(false);
	let open = $state(false);

	import { load } from '$lib/comps/forms/whatsapp/templates/select/actions';

	import * as Command from '$lib/comps/ui/command';
	import * as Popover from '$lib/comps/ui/popover';
	import Button from '$lib/comps/ui/button/button.svelte';
	import Plus from 'lucide-svelte/icons/plus';

	import { onMount } from 'svelte';
	onMount(async () => {
		loading = true;
		items = await load(null);
		if (value) {
			const selectedList = items.findIndex((i) => i.id === value);
			item = items[selectedList];
		}
		loading = false;
	});

	async function handleAdd(itemId: number) {
		value = itemId;
		const selected = items.findIndex((i) => i.id === itemId);
		onselect(items[selected]);
		item = items[selected];
	}

	let searchString: string | undefined = $state();

	async function search() {
		loading = true;
		items = await load(searchString);
		loading = false;
	}
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
</script>

<div class="flex items-center justify-start gap-2 flex-wrap">
	{@render popover()}
</div>
{#snippet popover()}
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				size="sm"
				builders={[builder]}
				variant="outline"
				class="justify-start gap-x-1 rounded-lg px-2 py-3 bg-white flex items-center"
			>
				{#if item}
					{$page.data.t.common.communications.nouns.template()}: {item.name}
					<div><ChevronDown size={16} /></div>
				{:else}
					<Plus size={14} />
					<div class="text-sm">{$page.data.t.forms.buttons.search()}</div>
				{/if}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="right">
			<Command.Root>
				<Command.Input
					placeholder={$page.data.t.common.actions.search()}
					bind:value={searchString}
					oninput={debounce(search, 500)}
				/>
				<Command.List>
					{#if loading}
						<Command.Loading>{$page.data.t.common.status.loading()}</Command.Loading>
					{:else}
						<Command.Empty>{$page.data.t.common.data.no_items()}</Command.Empty>
						{#each items as object, i}
							<Command.Item
								value={`${object.id}:::${object.name}`}
								onSelect={(v) => {
									const id = v.split(':::')[0];
									handleAdd(Number(id));
									open = false;
								}}
							>
								{object.name}
							</Command.Item>
						{/each}
					{/if}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
{/snippet}
