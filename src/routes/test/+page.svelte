<script lang="ts">
	import { onMount } from 'svelte';
	import background from '$lib/assets/background.webm';

	let video: HTMLVideoElement;

	onMount(() => {
		video.play();

		setTimeout(() => {
			video.pause();
			video.currentTime = 0;
			video.loop = true;
			video.play();
		}, 10000); // 60 seconds in milliseconds
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
	}

	video {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
