<script lang="ts">
	import { getRedirectLink } from '@utils/index';
	import discordIcon from '$lib/assets/discord-icon.svg';
	import loginBanner from '$lib/assets/login-banner.webp';
	import { DAEDALUS_SERVER_INVITE } from '../types';
</script>

<section class="flex justify-center items-center w-full mt-20">
	<div class="modalForm relative">
		<h2 class=" text-center text-white">Logo</h2>
		<h2 class=" text-center text-white">Welcome back</h2>
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
			Still not in our community? Join here.
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
