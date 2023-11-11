<script lang="ts">
	import trashIcon from '$lib/assets/trash-icon.svg';
	import disabledTrashIcon from '$lib/assets/disabled-trash-icon.svg';

	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';

	let createPollForm: HTMLFormElement;
	let pollDescription = '';
	let today = new Date();
	const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

	let startDate = formatDate(today);
	let endDate = formatDate(sevenDaysLater);
	$: {
		if (endDate < startDate) {
			endDate = startDate;
		}
	}

	let choices = ['', ''];
	let placeholders = ['', ''];

	function formatDate(date: Date) {
		return date.toISOString().split('T')[0];
	}

	function addNewOption() {
		choices = [...choices, ''];
	}

	function removeOption(index: number) {
		if (choices.length <= 2) {
			return;
		}
		choices = choices.filter((_, i) => i !== index);
	}
	const options = {
		theme: { '--toastBackground': ' #FF6F61', '--toastBarBackground': '#DC143C' },
		duration: 6900
	};
	let errors: Record<string, string> | undefined;

	$: {
		if (errors) {
			let duration = 7000;
			for (const key in errors) {
				toast.push(errors[key], { ...options, duration });
				duration += 3000;
			}
			setTimeout(() => {
				toast.pop(0);
			}, 20000);
		}
	}
	interface ResultData {
		data: {
			errors?: Record<string, string>;
		};
	}
	const handleSubmit = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return async ({ result }: any) => {
			const resultingData = result as ResultData;
			try {
				if (resultingData.data.errors) {
					errors = resultingData.data.errors;
				}
			} catch {
				goto('/polls?created=true&message=Poll added successfully');
			}
		};
	};
</script>

<form
	bind:this={createPollForm}
	class="modalForm max-h-[80vh] overflow-y-auto"
	method="post"
	action="?/createPoll"
	use:enhance={handleSubmit}
	title="Create a Poll"
>
	<h2 class="modalHeading">Create a Poll</h2>
	<div class="form-control" title="This will appear as a heading for your poll">
		<label for="title" class="label label-text">Poll Title</label>
		<input id="title" type="text" class="input input-bordered" name="title" required />
	</div>
	<div class="form-control" title="Enter the description of the poll">
		<label for="pollDescription" class="label label-text">Poll Description</label>
		<textarea
			id="pollDescription"
			name="pollDescription"
			class="textarea textarea-bordered"
			value={pollDescription}
			required
			placeholder={`ex. What's the best framework?`}
			title="Enter the description of the poll"
		/>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div class="form-control" title="Enter the start date of this poll">
			<label for="startDate" class="label label-text">Start Date</label>
			<input
				type="date"
				id="startDate"
				name="startDate"
				class="input input-bordered"
				bind:value={startDate}
				required
				min={startDate}
			/>
		</div>
		<div class="form-control" title="Enter the end date of this poll">
			<label for="endDate" class="label label-text">End Date</label>
			<input
				type="date"
				bind:value={endDate}
				min={startDate}
				required
				id="endDate"
				name="endDate"
				class="input input-bordered"
			/>
		</div>
	</div>
	<div class="form-control" title="Place the options here for the poll">
		<label for="options" class="label label-text">Options</label>
		{#each choices as choice, i}
			<div class="flex flex-row items-center mb-2">
				<input
					id="options"
					type="text"
					class=" w-full input input-bordered"
					bind:value={choice}
					name={`choices${i}`}
					title="Enter a new choice"
					required
					placeholder={placeholders[i]}
				/>
				<button
					type="button"
					class="ml-2 text-red-600"
					disabled={choices.length <= 2}
					on:click={() => removeOption(i)}
				>
					<img
						src={choices.length <= 2 ? disabledTrashIcon : trashIcon}
						alt="Delete Option"
						title="Delete Option"
						width="15"
						height="15"
					/>
				</button>
			</div>
		{/each}
		<button type="button" class="" on:click={addNewOption} title="Add new option">
			+ Add Option
		</button>
	</div>

	<div class="mt-6 flex justify-end">
		<a
			class="px-4 py-2 text-white rounded-lg cursor-pointer"
			title="Cancel the poll creation"
			href="/home"
			on:click|preventDefault={() => goto('/home')}>Cancel</a
		>
		<input
			type="submit"
			title="Create the poll"
			class="ml-2 px-4 py-2 bg-buttonColor text-white rounded cursor-pointer"
			value="Create poll"
		/>
	</div>
</form>
