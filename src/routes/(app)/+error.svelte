<script lang="ts">
	import { page } from '$app/stores';
	import CircleX from 'lucide-svelte/icons/circle-x';
</script>

<div class="border border-danger-500 rounded-lg p-4 mt-6 text-danger-600 bg-danger-50">
	<div class="flex w-full items-center gap-4">
		<div class="">
			<CircleX size="24" />
		</div>
		<div class="flex flex-col">
			<div class="font-bold text-lg">{$page.error?.message || 'An unknown error has occured'}</div>
			<div class="text-sm">
				{$page.error?.name || 'Unknown error'} [REF: {$page.error?.id || 'ERROR_UNKNOWN'}]
			</div>
		</div>
	</div>
</div>
