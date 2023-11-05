<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center justify-center">
		<label
			for="my-drawer-2"
			class="btn btn-square drawer-button lg:hidden btn-ghost fixed left-4 top-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-5 h-5 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			></label
		>
		<section class="flex flex-col items-center justify-center mt-10">
			<slot />
		</section>
	</div>
	<Sidebar user={data.verifiedUser} />
</div>
