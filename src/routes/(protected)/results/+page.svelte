<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { PollWithVoteCount } from '@/types/index';
	import type { ObjectId } from 'mongodb';
	import { slide } from 'svelte/transition';
	import Result from '@components/Result.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ModalContainer from '@components/ModalContainer.svelte';
	export let data: PageServerData;
	let poll: PollWithVoteCount | undefined;
	let polls = data.polls;
	let openModal = false;

	let pollsWithVotes: PollWithVoteCount[] = polls.map((poll) => {
		const voteCount = poll.choices.reduce((count, choice) => count + choice.voters.length, 0);
		const maxVoteCount = Math.max(...poll.choices.map((choice) => choice.voters.length));
		const shuffledChoices = [...poll.choices];
		for (let i = shuffledChoices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
		}
		return { ...poll, voteCount, maxVoteCount, choices: shuffledChoices };
	});
	$: pollId = new URL($page.url).searchParams.get('id');
	$: {
		if (pollId) {
			poll = pollsWithVotes.find((poll) => poll._id === pollId);
			openModal = true;
		} else {
			openModal = false;
		}
	}
	let document: Document;
	onMount(() => {
		document = window.document;
	});

	function revealAnswer(id: ObjectId | string) {
		const polls = document.querySelectorAll('[data-poll-id]');
		for (let i = 0; i < polls.length; i++) {
			if (polls[i].getAttribute('data-poll-id') == `${id}`) {
				polls[i].classList.remove('hidden');
			}
		}
	}
</script>

<SectionTitle sectionName="Results" sticky={true} />
<section class="flex flex-row gap-10 flex-wrap relative">
	{#each pollsWithVotes as poll (poll._id)}
		<div
			class="bg-[#191e24] p-4 rounded-lg shadow-lg my-4 w-[350px] min-h-[280px] flex flex-col justify-around"
			transition:slide={{
				duration: 300
			}}
		>
			<h1 class="h-[72px] max-h[72px] text-3xl font-semibold text-white mb-4">{poll.title}</h1>
			<p class="max-w-[320px] truncate text-white mb-4">{poll.pollDescription}</p>
			<div class="flex w-full justify-evenly min-h-16 align-baseline relative" role="list">
				{#each poll.choices as choice (choice)}
					<div class="relative rounded-full -translate-y-[-100%]" role="listitem">
						<div
							class={`mt-auto w-2 bg-gradient-to-r from-emerald-400
							 via-emerald-500 to-emerald-600 dark:from-blue-400
							  dark:via-blue-500 dark:to-blue-600 rounded-full
							   -translate-y-[100%] `}
							style="height: {(choice.voters.length / poll.maxVoteCount) * 90 + 10}%"
						/>
					</div>
				{/each}
			</div>

			<a
				class="btn mt-4 btn-block hover:btn-primary"
				href="results?id={poll._id}"
				role="button"
				on:click={() => goto('results?id=' + poll._id)}>Reveal Results</a
			>
		</div>
	{/each}
	<ModalContainer {openModal} url={'/results'}>
		{#key pollId}
			<Result {poll} />
		{/key}
	</ModalContainer>
</section>
