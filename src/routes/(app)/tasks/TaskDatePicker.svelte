<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		ZonedDateTime,
		DateFormatter,
		parseAbsoluteToLocal,
		type DateValue,
		getLocalTimeZone
	} from '@internationalized/date';

	import { cn } from '$lib/utils';
	import { Button } from '$lib/comps/ui/button/index.js';
	import { Calendar } from '$lib/comps/ui/calendar/index.js';
	import * as Popover from '$lib/comps/ui/popover/index.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let {
		value = $bindable(),
		onchange
	}: { value: Date | null | undefined; onchange: (date: Date) => void } = $props();
	let zonedValue: ZonedDateTime = $derived(
		value
			? parseAbsoluteToLocal(value.toISOString())
			: parseAbsoluteToLocal(new Date().toISOString())
	);
	let open = $state(false);
</script>

<Popover.Root bind:open>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-[200px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? `${df.format(zonedValue.toDate())}` : 'Pick a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar
			initialFocus
			onValueChange={(v) => {
				if (!v) return;
				const newValue = zonedValue.set({
					day: v.day,
					month: v.month,
					year: v.year,
					second: 0
				});
				value = newValue.toDate();
				onchange(value);
				open = false;
			}}
		/>
	</Popover.Content>
</Popover.Root>
