<script lang="ts">
	import { openVotePollModal } from '$lib/stores';
	import { Modals, type Poll } from '$lib/types';
	import ModalFooter from './ModalFooter.svelte';

	const samplePoll: Poll = {
		id: 1,
		pollDescription: "What's the best framework?",
		choices: ['React', 'Vue', 'Angular']
	};
	export let poll: Poll = samplePoll;
	const thisModal = Modals.VotePoll;
	let votePollForm: HTMLFormElement;
</script>

<div class={$openVotePollModal ? 'modalContainer' : 'modalContainerClosed'}>
	<form bind:this={votePollForm} class="modalForm">
		<h2 class="modalHeading">Vote for this poll</h2>

		<h5 class="text-center my-10">{poll.pollDescription}</h5>

		{#each poll.choices as choice}
			<div class="form-control">
				<label class="label cursor-pointer flex justify-start gap-5">
					<input type="radio" name="pollChoices" class="radio" />
					<span class="label-text">{choice}</span>
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
</div>
