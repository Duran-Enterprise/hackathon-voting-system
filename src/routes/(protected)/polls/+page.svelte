<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import type { Poll } from '@/types/index';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import ModalContainer from '@components/ModalContainer.svelte';

	export let data: PageServerData;
	let poll: Poll | undefined;
	let openModal = false;

	$: pollId = new URL($page.url).searchParams.get('id');
	$: vote = new URL($page.url).searchParams.get('voted');
	$: created = new URL($page.url).searchParams.get('created');
	$: message = new URL($page.url).searchParams.get('message');
	$: {
		if (pollId) {
			poll = data.polls.find((poll: Poll) => poll._id === pollId);
			openModal = true;
		} else {
			openModal = false;
		}
		if ((vote && message) || (created && message)) {
			let options;
			if (vote === 'success' || created) {
				options = {
					theme: { '--toastBackground': 'green', '--toastBarBackground': 'limegreen' },
					duration: 6900
				};
			}
			if (vote === 'fail') {
				options = {
					theme: { '--toastBackground': ' #FF6F61', '--toastBarBackground': '#DC143C' },
					duration: 6900
				};
			}
			toast.push(message, options);
			setTimeout(() => {
				toast.pop(0);
			}, 7000);
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

	<table class="table-auto w-full">
		<thead
			><tr>
				<th>Song</th>
				<th>Artist</th>
				<th>Year</th>
			</tr>
		</thead><tbody>
			<tr>
				<td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
				<td>Malcolm Lockyer</td>
				<td>1961</td>
			</tr>
			<tr>
				<td>Witchy Woman</td>
				<td>The Eagles</td>
				<td>1972</td>
			</tr>
			<tr>
				<td>Shining Star</td>
				<td>Earth, Wind, and Fire</td>
				<td>1975</td>
			</tr>
		</tbody>
	</table>

	<ModalContainer {openModal} url={'/polls'}>
		{#if pollId}
			<VotePollModal {poll} username={data.verifiedUser.username} />
		{/if}
	</ModalContainer>
</div>
