<script lang="ts">
	const { error }: { error: App.Error } = $props();
	import CircleX from 'lucide-svelte/icons/circle-x';
</script>

{#if error}
	<div class="border border-danger-500 rounded-lg p-4 text-danger-600 bg-danger-50">
		<div class="flex w-full items-center gap-4">
			<div class="">
				<CircleX size="24" />
			</div>
			<div class="flex flex-col">
				<div class="font-bold text-lg">{error.message || 'An unknown error has occured'}</div>
				<div class="text-sm">
					{error.name || 'Unknown error'} [REF: {error.id}]
				</div>
			</div>
		</div>
	</div>
{/if}
