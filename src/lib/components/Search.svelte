<script lang="ts">
	import type { Writable } from 'svelte/store';

	// eslint-disable-next-line
	let timeoutId: string | number | NodeJS.Timeout | undefined;

	export let searchString: Writable<string>;
	function debounce(event: KeyboardEvent) {
		const { value } = event.target as HTMLInputElement;
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			console.log({ value });
			searchString.set(value);
		}, 500);
	}
</script>

<section class="search opacity-40 hover:opacity-100 p-4">
	<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
		>Search</label
	>
	<div class="relative">
		<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			<svg
				class="w-4 h-4 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
		</div>
		<input
			type="search"
			id="default-search"
			class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Search polls..."
			title="Search keywords in either title or description..."
			on:keyup={debounce}
		/>
	</div>
</section>
