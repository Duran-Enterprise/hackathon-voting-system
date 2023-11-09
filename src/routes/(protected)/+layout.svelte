<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import type { LayoutServerData } from './$types';
	import { AppBar, AppLayout } from 'svelte-ux';
	import { page } from '$app/stores';
	export let data: LayoutServerData;
	let user = data.verifiedUser;
	// get current route
	$: route = $page.url.pathname;
</script>

<AppLayout headerPosition="inset">
	<nav slot="nav" class="h-full">
		<Sidebar {user} />
	</nav>

	<AppBar title={route.slice(1).charAt(0).toUpperCase() + route.slice(2).toLowerCase()}>
		<div slot="actions">
			<!-- App actions -->
		</div>
	</AppBar>

	<main class="pl-10">
		<slot />
	</main>
</AppLayout>
