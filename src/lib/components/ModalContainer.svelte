<script lang="ts">
	import { goto } from '$app/navigation';

	export let url: string;
	export let openModal: boolean;
</script>

<div class={openModal ? 'modalContainer relative' : 'modalContainerClosed'}>
	<a
		class="absolute inset-0 z-[1]"
		href={url}
		role="button"
		on:click|stopPropagation={() => goto(url)}
	>
		<!-- Outside of the modal -->
	</a>
	<div class="z-[2]">
		<slot />
	</div>
</div>
