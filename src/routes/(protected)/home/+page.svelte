<script lang="ts">
	import { Modals } from '@/types/index';
	import CreatePollModal from '@components/CreatePollModal.svelte';
	import { openModal } from '@utils/index';

	const createPoll = Modals.CreatePoll;
</script>

<h1>Home</h1>
<button class="btn mt-4" on:click={() => openModal(createPoll)}>Create Poll</button>
<CreatePollModal />
