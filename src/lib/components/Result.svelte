<script lang="ts">
	import type { PollWithVoteCount } from '@/types/index';
	import { onMount } from 'svelte';
	import { quartInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import Share from './SVGs/Share.svelte';
	import Email from './SVGs/Email.svelte';
	export let poll: PollWithVoteCount;
	const choices = poll.choices;

	choices.sort((a, b) => b.voters.length - a.voters.length);

	const widths = poll.choices.map(() =>
		tweened(0, { duration: 2000, delay: 300, easing: quartInOut })
	);
	function updateWidth() {
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

<div class=" relative customBorder min-h-[80vh] w-[min(80vw,42rem)]">
	<h1 class="max-w-2xl mx-auto pt-4 px-4 text-3xl font-bold text-balance" title={poll.title}>
		{poll.title}
	</h1>
	<Email
		classes="absolute top-[15px] right-12"
		data={{
			subject: `Voting Results - ${poll.title}`,
			body: `Title: ${poll.title}\nDescription: ${poll.pollDescription}`,
			link: true
		}}
	/>
	<Share />
	<div
		class=" relative w-full h-full max-w-2xl mx-auto p-4 z-0 max-h-[80vh]
     overflow-y-auto rounded shadow-md
     "
	>
		<p class="text-gray-600 mb-4 text-balance" title={poll.pollDescription}>
			{poll.pollDescription}
		</p>

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
				<li class="collapse overflow-visible border-b py-4 dark:border-gray-600">
					<input
						id={`choice${index}`}
						class=""
						type="checkbox"
						name="choices"
						checked={index === 0}
					/>
					<div class="collapse-title relative flex justify-between items-center w-full">
						<div
							data-result={index}
							class=" absolute inset-0 -left-6 -z-0 customGradient rounded-ee-md rounded-se-md"
							style="width: 0%"
						/>
						<label
							for={`choice${index}`}
							class=" text-shadow text-white text-lg font-semibold z-10 text-balance cursor-pointer"
							title={choice.choice}
						>
							{choice.choice}
						</label>
						<p class="text-shadow text-gray-600 dark:text-gray-300 z-10">
							Votes: {choice.voters.length}
						</p>
					</div>
					<ul class="collapse-content ml-4">
						{#each choice.voters as voter}
							<li class="text-gray-500 dark:text-gray-400" title={voter}>{voter}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</div>
