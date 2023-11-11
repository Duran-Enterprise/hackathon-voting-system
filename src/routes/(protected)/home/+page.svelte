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
			<p class="pt-6">Your quote for the day</p>
			<p class="pb-6">
				{quote.text}
				{quote.author}
			</p>
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
