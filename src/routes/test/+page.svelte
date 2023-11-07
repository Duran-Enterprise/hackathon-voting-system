<script lang="ts">
	import { Modals } from '@/types/index';
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import VotePollModal from '@components/VotePollModal.svelte';
	import { openModal } from '@utils/index';
	const createPoll = Modals.CreatePoll;
	const votePoll = Modals.VotePoll;
</script>

<div
	class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-darkBlack via-gray-900 to-stone-900"
>
	<h1>Test</h1>
	<div class="modalForm p-8 rounded-lg shadow-lg w-96 space-y-4 text-center">
		<span class="loading loading-bars loading-lg" />
		<h1 class="text-4xl font-semibold">Authenticating...</h1>
		<p class="text-gray-600">You will be redirected to the new page shortly.</p>
		<p class="text-gray-600">Stuck on this page? <a href="/">click here</a>.</p>
	</div>
	<button class="btn mt-4" on:click={() => openModal(createPoll)}>Create Poll</button>
	<CreatePollModal />
	<hr />
	<button class="btn mt-4" on:click={() => openModal(votePoll)}>Vote Poll</button>
	<VotePollModal />
	<hr />
</div>
