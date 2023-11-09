<script lang="ts">
	import type { DiscordUser } from '@/types/index';
	import { getAvatarLink } from '@utils/index';
	import home from '$lib/assets/home.svg';
	import polls from '$lib/assets/polls.svg';
	import results from '$lib/assets/results.svg';
	import logout from '$lib/assets/logout.svg';
	export let user: DiscordUser;
</script>

<ul class="menu p-4 min-h-full bg-darkBlack text-base-content">
	<h1 class="my-5 text-center text-lightWhite">Cast Away</h1>
	<div class="avatar my-4">
		<div class="w-24 rounded mx-auto">
			<img src={getAvatarLink(user)} alt="Discord Avatar" />
		</div>
	</div>
	<h4 class="text-center uppercase mb-4 text-lightWhite">{user.username}</h4>

	<li>
		<a class="text-lg gap-4 text-lightWhite" href="/home"><img src={home} alt="home icon" />Home</a>
	</li>
	<li>
		<a class="text-lg gap-4 text-lightWhite" href="/polls"
			><img src={polls} alt="polls icon" />Polls</a
		>
	</li>
	<li>
		<a class="text-lg gap-4 text-lightWhite" href="/results"
			><img src={results} alt="results icon" />Results</a
		>
	</li>
	<div class="divider my-4" />
	<li>
		<a class="text-lg gap-4 text-red-600" href="/?logout=true"
			><img src={logout} alt="logout icon" />Logout</a
		>
	</li>
</ul>
