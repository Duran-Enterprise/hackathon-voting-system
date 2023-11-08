<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Poll } from '../types';

	export let poll: Poll | undefined;
</script>

{#if !poll}
	<p>No Data available...</p>
{:else}
	<form class="modalForm">
		<h2 class="modalHeading">Vote for this poll</h2>

		<h5 class="text-center my-10">{poll.pollDescription}</h5>

		{#each poll.choices as choice}
			<div class="form-control">
				<label class="label cursor-pointer flex justify-start gap-5">
					<input type="radio" name="pollChoices" class="radio" />
					<span class="label-text">{choice.choice}</span>
				</label>
			</div>
		{/each}

		<div class="mt-6 flex justify-end">
			<a
				class="px-4 py-2 text-white rounded-lg cursor-pointer"
				title="Cancel your vote"
				href="/polls"
				on:click|preventDefault={() => goto('/polls')}>Cancel</a
			>
			<input
				type="submit"
				title="Submit your vote"
				class="ml-2 px-4 py-2 bg-buttonColor text-white rounded cursor-pointer"
				value="submit"
			/>
		</div>
	</form>
{/if}
