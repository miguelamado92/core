<script lang="ts">
	import { cn } from '$lib/utils/shadcn.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: WithElementRef<HTMLInputAttributes> = $props();
	let dateString: string | null = $state(null);
	if (value && value instanceof Date) {
		dateString = value.toISOString().slice(0, 10);
	}
	const defaultDate = new Date(new Date().setFullYear(new Date().getFullYear() - 30))
		.toISOString()
		.slice(0, 10); // 30 years ago
</script>

<input
	type="date"
	min="iso-date"
	max="iso-date"
	bind:this={ref}
	class={cn(
		'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value={dateString}
	onchange={() => {
		value = new Date(dateString || defaultDate);
	}}
	{...restProps}
/>
