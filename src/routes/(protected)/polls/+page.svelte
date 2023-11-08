<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
	import type { Poll } from '@/types/index';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageServerData;
	let poll: Poll | undefined;

	let openModal = false;
	$: pollId = new URL($page.url).searchParams.get('id');
	$: {
		if (pollId) {
			poll = data.polls.find((poll: Poll) => poll._id === pollId);

			openModal = true;
		} else {
			openModal = false;
		}
	}

	onMount(async () => {
		if (pollId) {
			await getPoll(pollId);
			console.log({ pollId });
		}
	});

	async function getPoll(id: string) {
		const response = await fetch(`/api/v1/poll/${id}`).then((response) => {
			response.json();
		});
		const data = response;
		console.log({ data });
	}
</script>

<div class="w-full mr-auto">
	<SectionTitle sectionName="Polls" />
	<ul class="list-disc pl-4 mr-auto">
		{#each data.polls as poll (poll._id)}
			<li class="text-gray-700 mb-2">
				<p>
					<a href={`polls?id=${poll._id}`} role="button">{poll.title}</a>
				</p>
			</li>
		{/each}
	</ul>
	<div class={openModal ? 'modalContainer' : 'modalContainerClosed'}>
		<VotePollModal {poll} />
	</div>
</div>
