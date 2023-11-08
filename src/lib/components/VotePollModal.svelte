<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { Poll } from '../types';

	export let poll: Poll | undefined, username: string;
	let votedChoice: string | null = null;
	$: {
		if (poll) {
			poll.choices.forEach((choice) => {
				if (choice.voters.includes(username.toLowerCase())) {
					votedChoice = choice.choice;
				}
			});
		}
	}
</script>

{#if !poll}
	<p>No Data available...</p>
{:else if votedChoice}
	<div class="modalForm">
		<h2 class="modalHeading">Your vote for this poll</h2>
		<h5 class="text-center my-10">{poll.pollDescription}</h5>
		{#each poll.choices as choice (choice.choice)}
			<div class="form-control">
				<label class="label cursor-pointer flex justify-start gap-5">
					<input
						type="radio"
						name="choice"
						class="radio"
						value={choice.choice}
						disabled={votedChoice !== null && votedChoice !== choice.choice}
						bind:group={votedChoice}
					/>
					<span class="label-text">{choice.choice}</span>
				</label>
			</div>
		{/each}
		<div class="mt-6 flex justify-end">
			<a
				class="px-4 py-2 text-white rounded-lg cursor-pointer"
				title="Go back to poll list"
				href="/polls"
				on:click|preventDefault={() => goto('/polls')}>Back</a
			>
			<a
				title="Check results"
				class="ml-2 px-4 py-2 bg-buttonColor text-white rounded cursor-pointer"
				href="/results/?pollId={poll._id}">Check Results</a
			>
		</div>
	</div>
{:else}
	<form method="post" action="?/submitVote" use:enhance class="modalForm">
		<h2 class="modalHeading">Vote for this poll</h2>
		<input hidden type="text" name="pollId" value={poll._id} />
		<h5 class="text-center my-10">{poll.pollDescription}</h5>

		{#each poll.choices as choice}
			<div class="form-control">
				<label class="label cursor-pointer flex justify-start gap-5">
					<input type="radio" name="choice" class="radio" value={choice.choice} />
					<span class="label-text">{choice.choice}</span>
				</label>
			</div>
		{/each}

		<div class="mt-6 flex justify-end">
			<a
				class="px-4 py-2 text-white rounded-lg cursor-pointer"
				title="Cancel your vote"
				href="/polls"
				on:click|preventDefault={() => goto('/polls')}>Cancel</a
			>
			<input
				type="submit"
				title="Submit your vote"
				class="ml-2 px-4 py-2 bg-buttonColor text-white rounded cursor-pointer"
				value="submit"
			/>
		</div>
	</form>
{/if}
