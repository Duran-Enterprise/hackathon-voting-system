<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import type { Poll } from '@/types/index';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let poll: Poll | undefined;
	let openModal = false;

	$: pollId = new URL($page.url).searchParams.get('id');
	$: vote = new URL($page.url).searchParams.get('voted');
	$: message = new URL($page.url).searchParams.get('message');
	$: {
		if (pollId) {
			poll = data.polls.find((poll: Poll) => poll._id === pollId);
			openModal = true;
		} else {
			openModal = false;
		}
		if (vote && message) {
			let options;
			if (vote === 'success') {
				options = {
					theme: { '--toastBackground': 'green', '--toastBarBackground': 'limegreen' }
				};
			}
			if (vote === 'fail') {
				options = {
					theme: { '--toastBackground': ' #FF6F61', '--toastBarBackground': '#DC143C' }
				};
			}
			toast.push(message, options);
		}
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
