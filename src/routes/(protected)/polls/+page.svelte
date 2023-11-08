<script lang="ts">
	import SectionTitle from '@components/layout/SectionTitle.svelte';
	import type { LayoutServerData } from '../$types';
	import VotePollModal from '@components/VotePollModal.svelte';
	import { Modals, type Poll } from '@/types/index';
	import { openModal } from '@utils/index';
	import { page } from '$app/stores';

	export let data: LayoutServerData;
	let poll: Poll | undefined = undefined;
	$: pollId = Number(new URL($page.url).searchParams.get('id'));
	$: {
		if (pollId) {
			poll = data.polls.find((p) => p.id === pollId);
			openModal(Modals.VotePoll);
		}
	}
</script>

<div class="w-full mr-auto">
	<SectionTitle sectionName="Polls" />
	<ul class="list-disc pl-4 mr-auto">
		{#each data.polls as poll (poll.id)}
			<li class="text-gray-700 mb-2">
				<p>
					<a href={`polls?id=${poll.id}`} role="button">{poll.title}</a>
				</p>
			</li>
		{/each}
	</ul>
	<VotePollModal {poll} />
</div>
