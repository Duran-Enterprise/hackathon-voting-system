<script lang="ts">
	import { Modals } from '@/types/index';
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
	import { openModal } from '@utils/index';
	const createPoll = Modals.CreatePoll;
	const votePoll = Modals.VotePoll;
</script>

<h1>Test</h1>
<button class="btn mt-4" on:click={() => openModal(createPoll)}>Create Poll</button>
<CreatePollModal />
<hr />
<button class="btn mt-4" on:click={() => openModal(votePoll)}>Vote Poll</button>
<VotePollModal />
<hr />
