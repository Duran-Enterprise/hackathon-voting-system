<script lang="ts">
	import { Modals } from '@/types/index';
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import { getAvatarLink, getRandomQuote, openModal } from '@utils/index';
	import type { LayoutServerData } from '../$types';
	export let data: LayoutServerData;
	const createPoll = Modals.CreatePoll;

	function getGreeting(): string {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) {
			return ' morning';
		} else if (hour >= 12 && hour < 18) {
			return ' afternoon';
		} else {
			return ' evening';
		}
	}

	const quote = getRandomQuote();
</script>

<SectionTitle sectionName="Home" />

<div class="card w-full bg-base-100 shadow-xl flex flex-row p-0">
	<figure class="p-8">
		<img class="rounded-full" src={getAvatarLink(data.verifiedUser, 320)} alt="Avatar" />
	</figure>
	<div class="card-body m-0 flex justify-around">
		<h2 class="card-title">
			Good{getGreeting()}, {data.verifiedUser.username.toUpperCase()}!
		</h2>
		<div class="w-full p-4 bg-zinc-600 border-l-4 border-slate-300">
			<p class="text-2xl italic text-white">{quote.text}</p>
			<p class="text-sm text-gray-200">{quote.author}</p>
		</div>
		<div class="card-actions justify-end">
			<button class="btn mt-4" on:click={() => openModal(createPoll)}>Create Poll</button>
			<a class="btn mt-4" href="/polls">Start Voting</a>
		</div>
	</div>
</div>
<SectionTitle sectionName="Your votes" />
<ul class="list-disc pl-4 mr-auto">
	{#each data.polls as poll (poll.id)}
		<li class="text-gray-700 mb-2">
			<p><a href="results?id={poll.id}">{poll.pollDescription}</a></p>
		</li>
	{/each}
</ul>

<CreatePollModal />
