<script lang="ts">
	import '$lib/styles/app.css';
	import '$lib/styles/global.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Background from '@components/layout/Background.svelte';
</script>

<svelte:head>
	<title>Cast Away - Voting webapp for Daedalus</title>
	<meta name="description" content="Voting webapp exclusive for Daedalus discord members" />
</svelte:head>
<Background />
<div>
	<SvelteToast />
	<slot />
</div>

<style>
</style>
