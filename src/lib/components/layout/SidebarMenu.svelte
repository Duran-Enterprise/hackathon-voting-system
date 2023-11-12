<script lang="ts">
	import home from '$lib/assets/home.svg';
	import polls from '$lib/assets/polls.svg';
	import results from '$lib/assets/results.svg';
	export let classes: string = '';
	export let aClasses: string = '';
</script>

<li class={classes}>
	<a class="text-lg gap-4 text-lightWhite {aClasses}" href="/home"
		><img src={home} alt="home icon" width="15" height="15" />Home</a
	>
</li>
<li class={classes}>
	<a class="text-lg gap-4 text-lightWhite {aClasses}" href="/polls"
		><img src={polls} alt="polls icon" width="15" height="15" />Polls</a
	>
</li>
<li class={classes}>
	<a class="text-lg gap-4 text-lightWhite {aClasses}" href="/results"
		><img src={results} alt="results icon" width="15" height="15" />Results</a
	>
</li>
