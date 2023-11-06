<script lang="ts">
	import type { DiscordUser } from '@/types/index';

	export let user: DiscordUser;
</script>

<div class="drawer-side">
	<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay" />
	<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
		<h1 class="my-5 text-center">Cast Away</h1>
		<div class="avatar my-4">
			<div class="w-24 rounded mx-auto">
				<img
					src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=300`}
					alt="Discord Avatar"
				/>
			</div>
		</div>
		<h4 class="text-center uppercase mb-4">{user.username}</h4>

		<li class="text-right text-lg"><a href="/home">Home</a></li>
		<li class="text-right text-lg"><a href="/polls">Polls</a></li>
		<li class="text-right text-lg"><a href="/results">Results</a></li>
		<div class="divider my-4" />
		<li class="text-right text-lg"><a href="/?logout=true">Logout</a></li>
	</ul>
</div>
