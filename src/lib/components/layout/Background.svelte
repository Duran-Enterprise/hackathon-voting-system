<!-- components/VideoBackground.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import background from '$lib/assets/background.webm';

	let video: HTMLVideoElement;

	onMount(() => {
		video.play();
	});
</script>

<div class="video-container">
	<video bind:this={video} autoplay loop muted>
		<source src={background} type="video/webm" />
		Your browser does not support the video tag.
	</video>
</div>

<style>
	.video-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
	}

	video {
		object-position: center center;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
