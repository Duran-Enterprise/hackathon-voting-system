<script lang="ts">
	import Navbar from '@components/layout/Navbar.svelte';
</script>

<Navbar />
<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="flex items-center justify-center space-x-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="w-16 h-16 text-red-500"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M16 16.5l-3-3m3 3l-3-3m-7-7l-3-3m3 3l-3-3"
			/>
		</svg>
		<h1 class="text-4xl font-semibold text-red-500">404</h1>
	</div>
	<p class="text-gray-600">Page not found</p>
	<a
		href="/"
		class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
		>Go back to Home</a
	>
</div>
