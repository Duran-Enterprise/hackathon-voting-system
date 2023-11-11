<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import type { PageServerData } from './$types';
	import type { PollWithVoteCount } from '@/types/index';
	import { fly, slide } from 'svelte/transition';
	import Result from '@components/Result.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ModalContainer from '@components/ModalContainer.svelte';
	import Search from '@components/Search.svelte';
	import { searchResults } from '$lib/stores';
	export let data: PageServerData;
	let poll: PollWithVoteCount | undefined;
	let polls = data.polls;
	let openModal = false;
	const pollsWithVotes: PollWithVoteCount[] = polls.map((poll) => {
		const voteCount = poll.choices.reduce((count, choice) => count + choice.voters.length, 0);
		const maxVoteCount = Math.max(...poll.choices.map((choice) => choice.voters.length));
		const shuffledChoices = [...poll.choices];
		for (let i = shuffledChoices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
		}
		return { ...poll, voteCount, maxVoteCount, choices: shuffledChoices };
	});
	$: filteredPolls = pollsWithVotes.filter(
		(poll) =>
			poll.title.toLowerCase().includes($searchResults.toLowerCase()) ||
			poll.pollDescription.toLowerCase().includes($searchResults.toLowerCase())
	);
	$: pollId = new URL($page.url).searchParams.get('id');
	$: {
		if (pollId) {
			poll = pollsWithVotes.find((poll) => poll._id === pollId);
			openModal = true;
		} else {
			openModal = false;
		}
	}
</script>

<SectionTitle sectionName="Results" />
<Search searchString={searchResults} />
<section
	class="flex flex-row justify-evenly flex-wrap relative
h-[calc(100vh-280px)] mt-1 overflow-y-auto"
>
	{#each filteredPolls as poll (poll._id)}
		<div
			class="box bg-darkBlack p-4 rounded-lg shadow-lg my-4 w-[350px] min-h-[280px] flex flex-col justify-around"
			transition:slide={{
				duration: 300,
				delay: 100,
				axis: 'x'
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
				class="btn mt-4 btn-block hover-primary"
				href="results?id={poll._id}"
				role="button"
				on:click={() => goto('results?id=' + poll._id)}>Reveal Results</a
			>
		</div>
	{/each}
	<ModalContainer {openModal} url={'/results'}>
		{#if pollId && poll}
			<Result {poll} />
		{/if}
	</ModalContainer>
</section>

<style>
	@property --angle {
		syntax: '<angle>';
		initial-value: 90deg;
		inherits: true;
	}

	@property --gradX {
		syntax: '<percentage>';
		initial-value: 50%;
		inherits: true;
	}

	@property --gradY {
		syntax: '<percentage>';
		initial-value: 0%;
		inherits: true;
	}

	:root {
		--d: 2500ms;
		--angle: 90deg;
		--gradX: 100%;
		--gradY: 50%;
		--c1: #3c84f4;
		--c2: rgba(168, 239, 255, 0);
	}
	/* w-[350px] min-h-[280px] */
	.box {
		position: relative;
	}
	.box > * {
		z-index: 11;
	}
	.box:hover::before {
		opacity: 1;
	}
	.box::before {
		opacity: 0;
		content: '';
		inset: 0;
		position: absolute;
		z-index: 10;
		border: 0.35rem solid;
		border-radius: 15px;
		border-image: conic-gradient(
				from var(--angle),
				var(--c2),
				var(--c1) 0.1turn,
				var(--c1) 0.15turn,
				var(--c2) 0.25turn
			)
			30;
		animation: borderRotate var(--d) linear infinite forwards;
		transition: opacity 0.5s ease-in-out;
	}
	@keyframes borderRotate {
		100% {
			--angle: 420deg;
		}
	}
</style>
