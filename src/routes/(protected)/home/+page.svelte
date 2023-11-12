<script lang="ts">
	import type { PageServerData } from './$types';
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import { getAvatarLink } from '@utils/index';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ModalContainer from '@components/ModalContainer.svelte';
	import Carousel from '@components/Carousel.svelte';
	import TransparentBackground from '@components/layout/TransparentBackground.svelte';
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
</script>

<div class="hero">
	<div class="hero-content flex-col lg:flex-row">
		<div class="avatar lg:mr-6">
			<div class="w-[200px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
				<img src={getAvatarLink(data.verifiedUser)} alt="avatar" width="200" height="200" />
			</div>
		</div>
		<div>
			<h1 class="text-xl sm:text-2xl lg:text-5xl font-bold text-center">
				Good{getGreeting()}, {data.verifiedUser.username.toUpperCase()}!
			</h1>
			<p class="lg:text-left pl-0 lg:pl-2 text-center mt-1.5 mb-4 text-sm text-gray-500">
				Let's start voting!🎉
			</p>
			<div class="flex lg:justify-start justify-center flex-col lg:flex-row">
				<a class=" text-sm lg:text-left lg:text-md btn bg-transparent mt-4" href="/polls"
					>Start Voting</a
				>
				<a
					href="home?new=true"
					role="button"
					class="text-sm lg:text-md btn btn-primary mt-4 mr-4"
					on:click={() => goto('home?new=true')}>Create Poll</a
				>
			</div>
		</div>
	</div>
</div>
<TransparentBackground classes="p-4">
	<SectionTitle sectionName="Featured Polls" />
	<Carousel data={data.featuredPolls} uniqueKey="featured" />

	<SectionTitle sectionName="Voted polls" />
	<Carousel data={data.userPolls} uniqueKey="user" path="results" />

	<ModalContainer {openModal} url={'/home'}>
		<CreatePollModal />
	</ModalContainer>
</TransparentBackground>

<style>
	div.hero {
		min-height: calc(100vh - 64px);
	}
</style>
