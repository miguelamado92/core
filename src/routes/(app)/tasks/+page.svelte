<script lang="ts">
	let { data } = $props();
	import Button from '$lib/comps/ui/button/button.svelte';
	import H1 from '$lib/comps/typography/H1.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import NewTaskForm from './NewTaskForm.svelte';
	let newTask = $state(false);
	import TaskDatePicker from './TaskDatePicker.svelte';

	import Plus from 'lucide-svelte/icons/circle-plus';
	import MinusCircle from 'lucide-svelte/icons/circle-minus';
	import PointPerson from '$lib/comps/widgets/point_person/PointPerson.svelte';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	let flash = getFlash(page);
	let openTaskIndex: number | null | undefined = $state(null);
	import { invalidateAll } from '$app/navigation';
	async function viewTask(i: number | undefined, task: (typeof data.tasks.items)[0]) {
		openTaskIndex = i === openTaskIndex ? null : i;
		if (task.viewed_at === null) {
			await fetch(`/api/v1/tasks/${task.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ viewed_at: new Date() })
			});
		}
		if (i !== null && i !== undefined) data.tasks.items[i].viewed_at = new Date();
	}

	async function doneTask(i: number | undefined, task: (typeof data.tasks.items)[0]) {
		try {
			if (task.completed_at === null) {
				const response = await fetch(`/api/v1/tasks/${task.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ completed_at: new Date() })
				});
				if (response.ok) {
					task.completed_at = new Date();
					$flash = { type: 'success', message: data.t.forms.actions.success() };
					await invalidateAll();
				}
			}
		} catch (err) {
			if (err instanceof Error) {
				$flash = { type: 'error', message: err.message };
			} else {
				$flash = { type: 'error', message: data.t.errors.generic() };
			}
		}
	}
</script>

<DataGrid items={data.tasks.items} count={data.tasks.count}>
	{#snippet header(filter)}
		<div class="w-full">
			<div class="flex items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<H1>{data.t.pages.tasks.index()}</H1>
				</div>
				<div class="flex items-center gap-2">
					{@render filter()}
					<Button
						onclick={() => (newTask = !newTask)}
						variant="default"
						size="sm"
						class="flex items-center gap-1"
					>
						{#if newTask}
							<MinusCircle size={16} />
						{:else}
							<Plus size={16} />
						{/if}
						<div>{data.t.pages.tasks.new()}</div>
					</Button>
				</div>
			</div>
			<div>
				{#if newTask}
					<NewTaskForm bind:open={newTask} superform={data.form} />
				{/if}
			</div>
		</div>
	{/snippet}

	{#snippet content(task: typeof data.tasks.items[0], i)}
		<div class="flex items-center divide-x flex-wrap md:flex-nowrap">
			<button
				onclick={() => {
					viewTask(i, task);
				}}
				class="flex items-center gap-4 flex-grow py-2 px-4"
				class:font-medium={task.viewed_at === null}
			>
				<div class="flex items-center gap-2 py-2" class:font-medium={task.viewed_at === null}>
					{task.name}
					{#if task.viewed_at === null}<span class="bg-orange-400 h-2 w-2 rounded-full"></span>{/if}
				</div>

				<div class="truncate text-light text-muted-foreground text-sm">
					{task.description}
				</div>
			</button>
			<div class="px-2 py-2">
				{@render calendar(task, i)}
			</div>
			<div class="px-2 py-2">
				<PointPerson type="task" admin={task.admin} objectId={task.id}>
					{#snippet header()}{/snippet}
				</PointPerson>
			</div>
			<div class="px-2 py-2">
				{@render doneButton(task, i)}
			</div>
		</div>
		{#if openTaskIndex === i}
			{@render openTask(task, i)}
		{/if}
	{/snippet}
</DataGrid>

{#snippet doneButton(task: typeof data.tasks.items[0], i)}
	<Button class="my-0 py-0" variant="secondary" size="sm" onclick={() => doneTask(i, task)}>
		{data.t.forms.buttons.done()}
	</Button>
{/snippet}

{#snippet openTask(task: typeof data.tasks.items[0], i)}
	<div class="border-t px-4 py-4 text-sm text-muted-foreground">{task.description}</div>
{/snippet}

{#snippet calendar(task: typeof data.tasks.items[0], i)}
	<TaskDatePicker
		bind:value={task.due_at}
		onchange={async (date) => {
			const response = await fetch(`/api/v1/tasks/${task.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ due_at: date })
			});
			if (!response.ok) {
				task.due_at = date;
			}
		}}
	/>
{/snippet}
