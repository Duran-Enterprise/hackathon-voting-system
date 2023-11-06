<script lang="ts">
	import { closeModal } from '@utils/index';
	import type { Modals } from '$lib/types';

	export let onSubmit: () => void = () => {};
	export let cancelTitle: string = 'Cancel';
	export let submitTitle: string = 'Submit';
	export let submit: string = 'Submit';
	export let thisModal: Modals;
	export let form: HTMLFormElement;
	function cancel() {
		if (form) {
			form.reset();
			closeModal(thisModal);
		}
	}
</script>

<div class="mt-6 flex justify-end">
	<button
		type="button"
		class="px-4 py-2 text-white rounded-lg"
		title={cancelTitle}
		on:click={cancel}>Cancel</button
	>
	<button
		type="submit"
		title={submitTitle}
		class="ml-2 px-4 py-2 bg-buttonColor text-white rounded"
		on:click={onSubmit}>{submit}</button
	>
</div>
