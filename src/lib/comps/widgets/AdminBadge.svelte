<script lang="ts">
	import type { Read } from '$lib/schema/core/admin';
	const { admin }: { admin: Read } = $props();
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
</script>

<div class="flex items-center gap-2">
	<Avatar profile_picture_url={admin.profile_picture_url} full_name={admin.full_name} />
	<div class="justify-start w-full">
		<div class="font-medium text-sm">{admin.full_name}</div>
		<div class="text-muted-foreground font-light text-sm">{admin.email}</div>
	</div>
</div>
