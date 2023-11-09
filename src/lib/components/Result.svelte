<script lang="ts">
	import type { PollWithVoteCount } from '@/types/index';
	import { onMount } from 'svelte';
	import { quartInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	export let poll: PollWithVoteCount = {
		_id: '1',
		title: 'Poll Title',
		pollDescription: 'Poll Description',
		choices: [
			{
				choice: 'Choice One',
				voters: ['dduran19', 'dduran19', 'dduran19', 'dduran19', 'dduran19', 'booswaa']
			},
			{
				choice: 'Choice Two',
				voters: ['dduran19', 'dduran19', 'dduran19']
			},
			{
				choice: 'Choice Three',
				voters: ['dduran19', 'dduran19', 'dduran19', 'dduran19']
			}
		],
		startDate: new Date('2023-11-07T00:00:00.000Z'),
		endDate: new Date('2023-11-11T00:00:00.000Z'),
		maxVoteCount: 6,
		voteCount: 16
	};

	const widths = poll.choices.map(() =>
		tweened(0, { duration: 2000, delay: 20, easing: quartInOut })
	);
	function updateWidth() {
		const choices = poll.choices;

		choices.forEach((choice, index) => {
			widths[index].set((choice.voters.length / poll.maxVoteCount) * 90 + 10);
		});
	}
	onMount(() => {
		const results = document.querySelectorAll('[data-result]');
		results.forEach((result, index) => {
			const element = result as HTMLDivElement;
			widths[index].subscribe((value) => {
				element.style.width = `${value}%`;
			});
		});
		updateWidth();
	});
</script>

<div class="relative max-w-2xl mx-auto mt-8 p-4 z-0 max-h-[80vh] overflow-y-auto">
	<div
		class=" absolute bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-md z-[-1] inset-0"
	/>
	<div class="absolute inset-0 scale-[1.003] z-[-2] customGradient rounded-md" />

	<h1 class="text-3xl font-bold mb-4">{poll.title}</h1>
	<p class="text-gray-600 mb-4">{poll.pollDescription}</p>

	<div class="flex justify-between mb-4">
		<div>
			<p class="text-gray-600 dark:text-gray-300">
				Start Date: {new Date(poll.startDate).toLocaleDateString()}
			</p>
			<p class="text-gray-600 dark:text-gray-300">
				End Date: {new Date(poll.endDate).toLocaleDateString()}
			</p>
		</div>
		<p class="text-gray-600 dark:text-gray-300">Total Votes: {poll.voteCount}</p>
	</div>

	<ul>
		{#each poll.choices as choice, index}
			<li class="border-b py-4 dark:border-gray-600">
				<div class="relative flex justify-between items-center w-full">
					<div
						data-result={index}
						class="absolute inset-0 -left-4 -z-0 customGradient rounded-ee-md rounded-se-md"
						style="width: 0%"
					/>
					<p class="text-shadow text-white text-lg font-semibold z-10">{choice.choice}</p>
					<p class="text-shadow text-gray-600 dark:text-gray-300 z-10">
						Votes: {choice.voters.length}
					</p>
				</div>

				<ul class="ml-4">
					{#each choice.voters as voter}
						<li class="text-gray-500 dark:text-gray-400">{voter}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<style>
	.text-shadow {
		text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.716);
	}
</style>
