<script lang="ts">
	import trashIcon from '$lib/assets/trash-icon.svg';
	import disabledTrashIcon from '$lib/assets/disabled-trash-icon.svg';

	import { openCreatePollModal } from '$lib/stores';
	import { closeModal } from '@utils/index';
	import { Modals } from '../types';
	import ModalFooter from './ModalFooter.svelte';

	let createPollForm: HTMLFormElement;
	let pollDescription = '';
	const today = new Date();
	const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

	let startDate = formatDate(today);
	let endDate = formatDate(sevenDaysLater);
	const thisModal = Modals.CreatePoll;
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
	function createPoll() {}

	function addNewOption() {
		choices = [...choices, ''];
	}

	function removeOption(index: number) {
		if (choices.length <= 2) {
			return;
		}
		choices = choices.filter((_, i) => i !== index);
		console.log(choices);
	}
</script>

<div class={$openCreatePollModal ? 'modalContainer' : 'modalContainerClosed'}>
	<form bind:this={createPollForm} class="modalForm">
		<h2 class="modalHeading">Create a Poll</h2>
		<div class="form-control" title="Enter the description of the poll">
			<label for="description" class="label label-text">Poll Description</label>
			<textarea
				id="description"
				class="textarea textarea-bordered"
				value={pollDescription}
				placeholder={`ex. What's the best framework?`}
			/>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="form-control" title="Enter the start date of this poll">
				<label for="startDate" class="label label-text">Start Date</label>
				<input
					type="date"
					id="startDate"
					class="input input-bordered"
					bind:value={startDate}
					min={startDate}
				/>
			</div>
			<div class="form-control" title="Enter the end date of this poll">
				<label for="endDate" class="label label-text">End Date</label>
				<input
					type="date"
					bind:value={endDate}
					min={startDate}
					id="endDate"
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
						/>
					</button>
				</div>
			{/each}
			<button type="button" class="" on:click={addNewOption} title="Add new option">
				+ Add Option
			</button>
		</div>

		<ModalFooter
			cancelTitle="Cancel the poll creation"
			submitTitle="Create the poll"
			submit="Create poll"
			{thisModal}
			form={createPollForm}
		/>
	</form>
</div>
