<script lang="ts">
	import { openCreatePollModal } from '$lib/stores';
	import CreatePollModal from '@components/CreatePollModal.svelte';

	function toggleCreatePollModal() {
		openCreatePollModal.update((value) => !value);
	}
</script>

<h1>Home</h1>
<button id="modalOpener" class="btn mt-4" on:click={toggleCreatePollModal}>Create Poll</button>
<CreatePollModal />
