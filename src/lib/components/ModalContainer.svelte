<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let url: string;
	export let openModal: boolean;
	export let key: number | object | boolean | string | null = null;
	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				goto(url);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div class={openModal ? 'modalContainer relative' : 'modalContainerClosed'}>
	<a
		class="absolute inset-0 z-[1] backdrop-blur-md"
		href={url}
		role="button"
		on:click|preventDefault|stopPropagation={() => goto(url)}
	>
		<!-- Outside of the modal -->
	</a>
	<div class="z-[2]">
		{#key key}
			<slot />
		{/key}
	</div>
</div>
