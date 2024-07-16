<script lang="ts">
	import { page } from '$app/stores';

	import type { Read, List } from '$lib/schema/core/admin';
	import AdminBadge from '$lib/comps/widgets/AdminBadge.svelte';
	import {
		changePointPerson,
		loadAdmins,
		type ChangePointPersonType
	} from '$lib/comps/widgets/point_person/changePointPerson';
	import { onMount, type Snippet } from 'svelte';
	type Props = {
		type: ChangePointPersonType;
		admins?: List['items'];
		admin: Read;
		objectId: number;
		header?: Snippet;
	};
	let { type, header, admin = $bindable(), admins = $bindable([]), objectId }: Props = $props();
	let loading = $state(false);
	let open = $state(false);
	let selectableAdmins = $derived(admins.filter((obj) => obj.id !== admin.id));

	import * as Command from '$lib/comps/ui/command';
	import * as Popover from '$lib/comps/ui/popover';
	import Button from '$lib/comps/ui/button/button.svelte';
	import RefreshCW from 'lucide-svelte/icons/refresh-cw';

	onMount(async () => {
		loading = true;
		admins = await loadAdmins();
		loading = false;
	});

	async function handleSwitchAdmin(adminId: number) {
		loading = true;
		admin = await changePointPerson(type, adminId, objectId);
		loading = false;
	}
</script>

<div class="group relative">
	{#if header}
		{@render header()}
	{:else}
		<div class="text-sm font-medium text-right mb-0.5">
			{$page.data.t.forms.fields.admins.point_person()}
		</div>
	{/if}
	<div class="flex items-center justify-start gap-1 w-full flex-wrap">
		<span class={loading ? 'animated animate-pulse saturate-0' : ''}><AdminBadge {admin} /></span>
		{@render popover()}
	</div>
</div>
{#snippet popover()}
	<div class="absolute z-40 right-0 opacity-0 group-hover:opacity-100">
		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					size="xs"
					builders={[builder]}
					variant="outline"
					class="justify-start gap-x-1 rounded-lg bg-white"><RefreshCW size={16} /></Button
				>
			</Popover.Trigger>
			<Popover.Content class="p-0" align="start" side="right">
				<Command.Root>
					<Command.Input placeholder={$page.data.t.forms.fields.admins.filter_admins()} />
					<Command.List>
						<Command.Empty>{$page.data.t.common.data.no_items()}</Command.Empty>
						<Command.Group>
							{#each selectableAdmins as adminItem}
								<Command.Item
									value={adminItem.id.toString()}
									onSelect={(v) => {
										handleSwitchAdmin(Number(v));
										open = false;
									}}
								>
									<AdminBadge admin={adminItem} />
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>
{/snippet}
