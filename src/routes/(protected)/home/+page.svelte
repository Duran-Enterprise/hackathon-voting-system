<script lang="ts">
	import type { PageServerData } from './$types';
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import { getAvatarLink, getRandomQuote } from '@utils/index';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ModalContainer from '@components/ModalContainer.svelte';
	import Carousel from '@components/Carousel.svelte';
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

<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
	<div class="sm:flex sm:items-center sm:justify-between">
		<div class="avatar">
			<div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
				<img src={getAvatarLink(data.verifiedUser)} alt="avatar" />
			</div>
		</div>
		<div class="text-center sm:text-left">
			<h1 class="text-2xl font-bold sm:text-3xl">
				Good {getGreeting()}, {data.verifiedUser.username}!
			</h1>

			<p class="mt-1.5 text-sm text-gray-500">Let's start voting!🎉</p>
		</div>

		<a class="btn bg-transparent mt-4 ml-20" href="/polls">Start Voting</a>
		<div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
			<a
				href="home?new=true"
				role="button"
				class="btn btn-primary mt-4 mr-4"
				on:click={() => goto('home?new=true')}>Create Poll</a
			>
		</div>
	</div>
</div>

<div class="hero">
	<div class="hero-content flex-col lg:flex-row">
		<img
			src={getAvatarLink(data.verifiedUser, 320) || ''}
			class="max-w-sm rounded-lg shadow-2xl"
			alt="Avatar"
			height="256"
			width="256"
		/>
		<div>
			<h1 class="text-5xl font-bold">
				Good{getGreeting()}, {data.verifiedUser.username.toUpperCase()}!
			</h1>
			<p class="font-bold pt-6">Your quote for the day</p>
			<div class="w-full p-4 bg-gray-700 border-l-4 border-slate-300">
				<p class=" text-2xl italic pb-2 max-w-2xl">
					{quote.text}
				</p>
				<p class="text-sm text-gray-200 pb-4">{quote.author}</p>
			</div>
			<a
				href="home?new=true"
				role="button"
				class="btn btn-primary mt-4 mr-4"
				on:click={() => goto('home?new=true')}>Create Poll</a
			>
			<a class="btn bg-transparent mt-4" href="/polls">Start Voting</a>
		</div>
	</div>
</div>

<SectionTitle sectionName="Featured Polls" />
<Carousel data={data.featuredPolls} uniqueKey="featured" />

<SectionTitle sectionName="Voted polls" />
<Carousel data={data.userPolls} uniqueKey="user" path="results" />

<ModalContainer {openModal} url={'/home'}>
	<CreatePollModal />
</ModalContainer>

<style>
	div.hero {
		min-height: calc(100vh - 64px);
	}
</style>
