<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import type { Poll } from '@/types/index';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import ModalContainer from '@components/ModalContainer.svelte';
	import { CountVotesToPolls, pollsListSorter } from '@utils/index';

	export let data: PageServerData;
	let poll: Poll | undefined;
	let openModal = false;

	let sortedPolls = pollsListSorter(data.polls);
	let sortedPollsWithCount = CountVotesToPolls(sortedPolls);
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

<SectionTitle sectionName="Polls" />
<section class="relative h-[calc(100vh-280px)] mt-1 overflow-y-auto">
	<table class=" table-auto w-full">
		<thead
			><tr>
				<th class="text-left"><h4>Title</h4></th>
				<th><h4>Vote count</h4></th>
				<th><h4>Start date</h4></th>
				<th><h4>End date</h4></th>
			</tr>
		</thead><tbody>
			{#each sortedPollsWithCount as poll}
				<tr class="hover:bg-lightGray" title={poll.pollDescription}>
					<td
						><a class="hover:font-normal" href={`polls?id=${poll._id}`} role="button"
							>{poll.title}</a
						></td
					>
					<td class="text-center">{poll.voteCount}</td>
					<td class="text-center">{String(poll.startDate).split('T')[0]}</td>
					<td class="text-center">{String(poll.endDate).split('T')[0]}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<ModalContainer {openModal} url={'/polls'}>
	{#if pollId}
		<VotePollModal {poll} username={data.verifiedUser.username} />
	{/if}
</ModalContainer>
