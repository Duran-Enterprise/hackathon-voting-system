<script lang="ts">
	import { getRedirectLink } from '@utils/index';
	import daedalusLogo from '$lib/assets/daedalusLogo.webp';
	import discordIcon from '$lib/assets/discord-icon.svg';
	import loginBanner from '$lib/assets/login-banner.webp';
	import { DAEDALUS_SERVER_INVITE } from '../types';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
</script>

<section class="flex justify-center items-center w-full h-screen">
	<div class="modalForm relative" in:fly={{ y: 100, duration: 500, easing: quadInOut }}>
		<!-- <h2 class=" text-center text-white"></h2> -->
		<img class="mx-auto mb-2" src={daedalusLogo} alt="Daedalus logo" width="72" height="72" />
		<h2 class=" text-center text-white">Cast Away</h2>
		<a
			href={getRedirectLink()}
			role="button"
			class="btn btn-block bg-buttonColor text-white mt-10"
			title="Login with Discord"
		>
			<img src={discordIcon} alt="Discord Icon" />
			Continue with Discord</a
		>
		<a
			class="text-center text-white block mt-2 mb-20"
			href={DAEDALUS_SERVER_INVITE}
			title="Join us now!"
			target="_blank"
		>
			Can't login? Join our community.
		</a>

		<a href={DAEDALUS_SERVER_INVITE} title="Join us now!" target="_blank">
			<img
				src={loginBanner}
				alt="Join us now!"
				class="mt-10 absolute bottom-[0] left-0 rounded-bl-lg rounded-br-lg"
			/></a
		>
	</div>
</section>
