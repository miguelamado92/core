<script lang="ts">
	import type { Snippet } from 'svelte';
	import X from 'lucide-svelte/icons/x';
	let {
		open = false,
		placement = 'right',
		maxScreenSize = 'max-w-md',
		onclickaway = () => {},
		content
	}: {
		open: boolean;
		placement?: 'left' | 'right';
		maxScreenSize?: string;
		onclickaway?: () => void;
		content: Snippet;
	} = $props();

	const handleClickAway = () => {
		onclickaway();
	};

	$effect(() => {
		const body = document.querySelector('body');
		if (body && body.style) {
			body.style.overflow = open ? 'hidden' : 'auto';
		}
	});
</script>

<aside>
	<div
		class="fixed inset-0 w-full h-full z-20 overflow-hidden flex items-stretch {open
			? 'visible'
			: 'invisible'}"
	>
		<div
			class="w-screen h-full bg-slate-800 cursor-pointer duration-100 transition-opacity overflow-hidden {open
				? 'opacity-70'
				: 'opacity-0'}"
			onclick={handleClickAway}
			onkeyup={handleClickAway}
			role="button"
			tabindex="-1"
		></div>
		<div
			class="absolute {placement === 'left'
				? 'left-0'
				: 'right-0'} opacity-100 top-0 shadow-xl overflow-y-auto bg-white transition-all duration-100 h-full px-4 py-4 {maxScreenSize} {open
				? 'w-screen'
				: 'w-0'}"
		>
			<div class="mb-2 flex {placement === 'left' ? 'justify-end' : 'justify-start'}">
				<button class="text-slate-600 hover:text-slate-500" onclick={() => handleClickAway()}
					><X size={20} /> <span class="sr-only">Close</span></button
				>
			</div>
			{@render content()}
		</div>
	</div>
</aside>
