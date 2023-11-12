<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import type { LayoutServerData } from './$types';
	import { AppBar, AppLayout } from 'svelte-ux';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import SidebarMenu from '@components/layout/SidebarMenu.svelte';
	export let data: LayoutServerData;
	let user = data.verifiedUser;
	$: route =
		$page.url.pathname.slice(1).charAt(0).toUpperCase() + $page.url.pathname.slice(2).toLowerCase();
</script>

<AppLayout headerPosition="inset">
	<nav slot="nav" class="h-full">
		<Sidebar {user} />
	</nav>

	<AppBar title={route}>
		<div slot="actions">
			<!-- App actions -->
		</div>
	</AppBar>

	<main class="px-10">
		{#key route}
			<div in:fly={{ duration: 300, x: 100 }}>
				<slot />
			</div>
		{/key}
	</main>
</AppLayout>
<div class="dropdown dropdown-top dropdown-end fixed right-4 bottom-4 z-30 dropdown-hover">
	<button tabindex="0" class="btn m-1 rounded-full">-</button>
	<button tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
		<SidebarMenu classes="w-full" />
	</button>
</div>
