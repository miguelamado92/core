<script lang="ts">
	import { page } from '$app/stores';
	type Props = {
		message: string;
		timeAgo: Date;
	};
	const { message, timeAgo }: Props = $props();
</script>

<div class="flex justify-center">
	<div class="text-xs text-gray-500 leading-none">
		<div class="bg-gray-100 rounded-full py-1 px-4">{@html message}</div>
		<div class="mt-2 text-center">{$page.data.timeAgo.format(timeAgo)}</div>
	</div>
</div>
