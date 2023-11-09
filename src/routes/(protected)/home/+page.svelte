<script lang="ts">
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import { getAvatarLink, getRandomQuote } from '@utils/index';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ModalContainer from '@components/ModalContainer.svelte';
	export let data: PageServerData;

	let openModal = false;
	$: newPoll = new URL($page.url).searchParams.get('new');
	$: {
		if (newPoll) {
			openModal = true;
		} else {
			openModal = false;
		}
	}
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

<div class="card w-full bg-base-100 shadow-xl flex flex-col md:flex-row max-w-3xl mx-auto">
	<figure class="p-8 min-w-[320px]">
		<img
			class="rounded-full aspect-square"
			src={getAvatarLink(data.verifiedUser, 320) || ''}
			alt="Avatar"
		/>
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
			<a href="home?new=true" role="button" class="btn mt-4" on:click={() => goto('home?new=true')}
				>Create Poll</a
			>
			<a class="btn mt-4" href="/polls">Start Voting</a>
		</div>
	</div>
</div>
<SectionTitle sectionName="Your votes" />
<ul class="list-disc pl-4 mr-auto">
	{#each data.userPolls as poll (poll._id)}
		<li class="text-gray-700 mb-2">
			<p><a href="results?id={poll._id}">{poll.title}</a></p>
		</li>
	{/each}
</ul>

<ModalContainer {openModal} url={'/home'}>
	<CreatePollModal />
</ModalContainer>
