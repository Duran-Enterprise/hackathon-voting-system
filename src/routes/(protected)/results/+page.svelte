<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import type { LayoutServerData } from '../$types';
	import { onMount } from 'svelte';
	export let data: LayoutServerData;
	let polls = data.polls;

	let document: Document;
	onMount(() => {
		document = window.document;
	});

	function revealAnswer(id: number) {
		const polls = document.querySelectorAll('[data-poll-id]');
		for (let i = 0; i < polls.length; i++) {
			if (polls[i].getAttribute('data-poll-id') == `${id}`) {
				polls[i].classList.remove('hidden');
			}
		}
	}
</script>

<SectionTitle sectionName="Results" />
<section class="flex flex-row gap-10">
	{#each polls as poll (poll.id)}
		<div class="bg-[#191e24] p-4 rounded-lg shadow-lg my-4">
			<h1 class="text-3xl font-semibold text-white mb-4">{poll.title}</h1>
			<p class="min-w-[320px] truncate text-white mb-4">{poll.pollDescription}</p>

			{#each poll.choices as choice (choice)}
				<div class="flex items-center justify-around mb-2 gap-5">
					<div class="w-1/2">
						<div class="relative rounded-full h-8">
							<div
								class="h-full flex items-center bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 rounded-full"
								style="width: {(choice.votes / poll.choices.length) * 100}%"
							>
								<p
									data-poll-id={poll.id}
									class="hidden pl-5 label-text font-bold dark:text-white text-gray-900 w-full"
								>
									{choice.choice}
								</p>
							</div>
						</div>
					</div>
					<div class="w-1/2 pl-2">
						<div class="label cursor-pointer">
							<span class="label-text text-blue-600 dark:text-blue-300 ml-auto"
								>{choice.votes} Vote{choice.votes > 1 ? 's' : ''}</span
							>
						</div>
					</div>
				</div>
			{/each}

			<button class="btn mt-4 btn-block" on:click={() => revealAnswer(poll.id)}
				>Reveal Results</button
			>
			<button class="btn btn-block btn-primary" on:click={() => revealAnswer(poll.id)}
				>See More Details</button
			>
		</div>
	{/each}
</section>
