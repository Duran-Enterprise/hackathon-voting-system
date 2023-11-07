<script lang="ts">
	import { openVotePollModal } from '$lib/stores';
	import { Modals, type Poll } from '$lib/types';
	import ModalFooter from './ModalFooter.svelte';

	const samplePoll: Poll = {
		id: 1,
		pollDescription: "What's the best framework?",
		choices: [
			{ choice: 'React', votes: 0 },
			{ choice: 'Vue', votes: 0 },
			{ choice: 'Svelte', votes: 0 }
		],
		startDate: new Date(),
		endDate: new Date(),
		voters: []
	};
	export let poll: Poll | undefined = samplePoll;
	const thisModal = Modals.VotePoll;
	let votePollForm: HTMLFormElement;
</script>

<div class={$openVotePollModal ? 'modalContainer' : 'modalContainerClosed'}>
	{#if !poll}
		<p>No Data available...</p>
	{:else}
		<form bind:this={votePollForm} class="modalForm">
			<h2 class="modalHeading">Vote for this poll</h2>

			<h5 class="text-center my-10">{poll.pollDescription}</h5>

			{#each poll.choices as choice}
				<div class="form-control">
					<label class="label cursor-pointer flex justify-start gap-5">
						<input type="radio" name="pollChoices" class="radio" />
						<span class="label-text">{choice.choice}</span>
					</label>
				</div>
			{/each}

			<ModalFooter
				cancelTitle="Cancel your vote"
				submitTitle="Submit your vote"
				submit="Submit Vote"
				{thisModal}
				form={votePollForm}
			/>
		</form>
	{/if}
</div>
