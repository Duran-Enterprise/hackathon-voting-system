<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import ModalContainer from '@components/ModalContainer.svelte';
	import {
		CountVotesToPolls,
		formatDate,
		pollsListSorter,
		PollStatus,
		type PollWithStatus
	} from '@utils/index';
	import TransparentBackground from '@components/layout/TransparentBackground.svelte';
	import { goto } from '$app/navigation';
	import Result from '@components/Result.svelte';
	import type { PollWithVoteCount } from '@/types/index';

	export let data: PageServerData;
	let poll:
		| PollWithStatus
		| (PollWithVoteCount & {
				status?: PollStatus;
		  })
		| undefined;
	let openModal = false;

	let sortedPolls = pollsListSorter(data.polls);
	let sortedPollsWithCount = CountVotesToPolls(sortedPolls) as (PollWithVoteCount & {
		status: PollStatus;
	})[];
	$: pollId = $page.url.searchParams.get('id');
	$: vote = $page.url.searchParams.get('voted');
	$: created = $page.url.searchParams.get('created');
	$: message = $page.url.searchParams.get('message');
	$: {
		if (pollId) {
			poll = sortedPollsWithCount.find((poll) => poll._id === pollId);
			openModal = true;
		} else {
			openModal = false;
		}
	}
	$: {
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

<SectionTitle sectionName="Public Polls" />
<TransparentBackground>
	<section class="relative h-[calc(100vh-280px)] mt-1 overflow-y-auto p-4">
		<table class=" table-auto w-full">
			<thead class="h-6 align-top border-b-2 border-lightGray"
				><tr>
					<th class="text-left text-gray-200"><h4>Title</h4></th>
					<th class="text-gray-200"><h4>Status</h4></th>
					<th class="text-gray-200"><h4>Vote count</h4></th>
					<th class="text-gray-200"><h4>Date range</h4></th>
				</tr>
			</thead>
			<div class="m-2" />
			<tbody>
				{#each sortedPollsWithCount as poll}
					<tr class="h-8 hover:bg-lightGray" title={poll.pollDescription}>
						<td
							><a
								class="text-gray-300 hover:font-normal"
								href={`/public/results?id=${poll._id}`}
								role="button">{poll.title}</a
							></td
						>
						<td
							class="text-center flex justify-center gap-2"
							on:dblclick={() => goto(`/public/results?id=${poll._id}`)}
						>
							<p
								class={`badge` +
									(poll.status === PollStatus.ACTIVE
										? ' badge-success'
										: poll.status === PollStatus.UPCOMING
										? ' badge-warning'
										: poll.status === PollStatus.EXPIRED
										? ' badge-error'
										: '')}
							>
								{poll.status}
							</p>
						</td>

						<td class="text-center text-gray-300">{poll.voteCount}</td>
						<td class="text-center text-gray-300">
							{formatDate(poll.startDate)} - {formatDate(poll.endDate)}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</TransparentBackground>

<ModalContainer {openModal} url={'/public/results'}>
	{#if pollId && poll}
		<Result {poll} />
	{/if}
</ModalContainer>
