<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import type { LayoutServerData } from './$types';
	import { AppBar, AppLayout } from 'svelte-ux';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
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
