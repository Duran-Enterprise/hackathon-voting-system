<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
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

	export let data: PageServerData;
	let poll: PollWithStatus | undefined;
	let openModal = false;

	let sortedPolls = pollsListSorter(data.polls);
	let sortedPollsWithCount = CountVotesToPolls(sortedPolls) as PollWithStatus[];
	$: pollId = new URL($page.url).searchParams.get('id');
	$: vote = new URL($page.url).searchParams.get('voted');
	$: created = new URL($page.url).searchParams.get('created');
	$: message = new URL($page.url).searchParams.get('message');
	$: {
		if (pollId) {
			poll = sortedPollsWithCount.find((poll) => poll._id === pollId);
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
<TransparentBackground>
	<section class="relative h-[calc(100vh-280px)] mt-1 overflow-y-auto p-4">
		<table class=" table-auto w-full">
			<thead
				><tr>
					<th class="text-left"><h4>Title</h4></th>
					<th><h4>Status</h4></th>
					<th><h4>Vote count</h4></th>
					<th><h4>Date range</h4></th>
				</tr>
			</thead><tbody>
				{#each sortedPollsWithCount as poll}
					<tr class="hover:bg-lightGray" title={poll.pollDescription}>
						<td
							><a class="hover:font-normal" href={`polls?id=${poll._id}`} role="button"
								>{poll.title}</a
							></td
						>
						<td
							class="text-center flex justify-center gap-2"
							on:dblclick={() => goto(`/polls?id=${poll._id}`)}
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
							{#if poll.choices.some( (choice) => choice.voters.includes(data.verifiedUser.username) )}
								<p class="badge badge-primary bg-primary">voted</p>
							{/if}
						</td>

						<td class="text-center">{poll.voteCount}</td>
						<td class="text-center"> {formatDate(poll.startDate)} - {formatDate(poll.endDate)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</TransparentBackground>
<ModalContainer {openModal} url={'/polls'}>
	{#if pollId}
		<VotePollModal {poll} username={data.verifiedUser.username} />
	{/if}
</ModalContainer>
