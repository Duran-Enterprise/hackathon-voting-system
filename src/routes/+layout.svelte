<script lang="ts">
	import '$lib/styles/app.css';
	import background from '$lib/assets/background.webp';
</script>

<svelte:head>
	<title>Cast Away - Voting webapp for Daedalus</title>
	<meta name="description" content="Voting webapp exclusive for Daedalus discord members" />
</svelte:head>
<div class="bg-darkBackground" style="background-image: url({background})">
	<slot />
</div>

<style>
	div {
		background-repeat: no-repeat;
		background-size: cover;
		height: 100vh;
	}
</style>
