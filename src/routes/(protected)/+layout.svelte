<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import type { LayoutServerData } from './$types';
	import { AppBar, AppLayout } from 'svelte-ux';
	export let data: LayoutServerData;
	let user = data.verifiedUser;
</script>

<AppLayout>
	<nav slot="nav" class="h-full">
		<Sidebar {user} />
	</nav>

	<AppBar title="Cast Away">
		<div slot="actions">
			<!-- App actions -->
		</div>
	</AppBar>

	<main class="pl-10">
		<slot />
	</main>
</AppLayout>
