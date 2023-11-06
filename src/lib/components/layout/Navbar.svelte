<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="bg-gray-950 p-4 flex justify-between items-center">
	<button class="text-2xl font-semibold text-white" on:click={() => goto('/')}> Cast Away</button>

	<div class="space-x-4">
		<a href="/home" class="text-white">Home</a>
		<a href="/polls" class="text-white">Polls</a>
		<a href="/results" class="text-white">Results</a>
	</div>

	<a href="/login" class="text-white font-semibold">Login</a>
</div>
