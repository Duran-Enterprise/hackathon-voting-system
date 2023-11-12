<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { PollStatus, type PollWithStatus } from '@utils/index';

	export let poll: PollWithStatus | undefined, username: string;
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
	function tooEarly() {
		if (!poll) return false;
		return new Date() < new Date(poll?.startDate);
	}
	function tooLate() {
		if (!poll) return false;
		return new Date() > new Date(poll?.endDate);
	}
	const openDescription = writable(false);
</script>

<div class="relative">
	{#if poll}
		<p
			class={`absolute top-2 right-2  badge` +
				(poll.status === PollStatus.ACTIVE
					? ' badge-success'
					: poll.status === PollStatus.UPCOMING
					? ' badge-warning'
					: poll.status === PollStatus.EXPIRED
					? ' badge-error'
					: '')}
		>
			{poll.status}
		</p>
	{/if}
	{#if !poll}
		<p>No Data available...</p>
	{:else if votedChoice}
		<div class="modalForm max-h-[80vh] overflow-y-auto">
			<h2 class="modalHeading">Your vote for this poll</h2>
			<p class="text-center my-10 truncate">{poll.pollDescription}</p>
			<button
				class="btn btn-block my-4"
				on:click|preventDefault={() => {
					openDescription.set(true);
				}}>See Full Description</button
			>
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
			<div class="mt-6 flex justify-center">
				<a
					title="Check results"
					class="py-2 btn btn-primary btn-block text-white rounded cursor-pointer"
					on:click|preventDefault={() => {
						if (!poll) return;
						goto(`/results/?id=${poll._id}`);
					}}
					href="/results/?id={poll._id}">Check poll with vote details</a
				>
			</div>
		</div>
	{:else}
		<form
			method="post"
			action="?/submitVote"
			use:enhance
			class="modalForm max-h-[80vh] overflow-y-auto"
		>
			<h2 class="modalHeading">Vote for this poll</h2>
			<input hidden type="text" name="pollId" value={poll._id} />
			<p class="text-center my-10 truncate">{poll.pollDescription}</p>
			<button
				class="btn btn-block my-4"
				on:click|preventDefault={() => {
					openDescription.set(true);
				}}>See Full Description</button
			>
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
				<button
					type="submit"
					title={tooEarly()
						? 'Voting has not started yet'
						: tooLate()
						? 'Voting has ended'
						: 'Vote now'}
					class={`ml-2 px-4 py-2 bg-buttonColor disabled:bg-gray-500 text-white rounded cursor-pointer`}
					disabled={tooEarly() || tooLate()}
				>
					{#if tooEarly()}
						<span>Vote now</span>
					{:else if tooLate()}
						<a
							title="Check results"
							class="py-2 btn btn-primary btn-block text-white rounded cursor-pointer"
							on:click|preventDefault={() => {
								if (!poll) return;
								goto(`/results/?id=${poll._id}`);
							}}
							href="/results/?id={poll._id}">Check poll with vote details</a
						>
					{:else}
						<span>Vote now</span>
					{/if}
				</button>
			</div>
		</form>
	{/if}
</div>

{#if $openDescription && poll}
	<div
		class="fixed z-30 inset-0 flex flex-col text-center
	 h-screen w-screen bg-darkBlack overflow-y-auto p-8"
	>
		<h2 class="w-[100%] text-gray-400 py-4">{poll.title}</h2>
		<p class="text-gray-500 mb-2 w-[100%] max-h-[80vh] overflow-y-auto text-lg">
			{poll.pollDescription}
		</p>
		<button
			class="btn btn-block btn-outline my-4"
			on:click|preventDefault={() => {
				openDescription.set(false);
			}}>Close</button
		>
	</div>
{/if}

<style>
	.customLink {
		all: unset;
	}
</style>
