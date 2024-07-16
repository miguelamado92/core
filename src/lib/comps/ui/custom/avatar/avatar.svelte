<script lang="ts">
	import * as Avatar from '$lib/comps/ui/avatar';
	export let href: string | null = null;
	import { nameToInitials } from '$lib/utils/text/names';
	export let profile_picture_url: string | null;
	export let full_name: string;
	let className = '';
	export { className as class };
	import { cn } from '$lib/utils';

	export let textClass = '';
</script>

{#snippet avatar()}
	<Avatar.Root role="button" class={cn('h-8 w-8 cursor-pointer', className)}>
		<Avatar.Image src={profile_picture_url} alt={full_name} />
		<Avatar.Fallback class={cn('bg-red-500 text-white', textClass)}
			>{nameToInitials(full_name)}</Avatar.Fallback
		>
	</Avatar.Root>
{/snippet}

{#if href}
	<a {href} {...$$restProps}>
		{@render avatar()}
	</a>
{:else}
	{@render avatar()}
{/if}
