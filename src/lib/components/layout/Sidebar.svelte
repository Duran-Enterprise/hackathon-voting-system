<script lang="ts">
	import type { DiscordUser } from '@/types/index';
	import { getAvatarLink } from '@utils/index';
	import home from '$lib/assets/home.svg';
	import polls from '$lib/assets/polls.svg';
	import results from '$lib/assets/results.svg';
	import logout from '$lib/assets/logout.svg';
	import { Button, Dialog, Toggle } from 'svelte-ux';
	export let user: DiscordUser;
</script>

<ul class="menu p-4 min-h-full bg-darkBlack text-base-content">
	<h1 class="my-5 text-center text-lightWhite">Cast Away</h1>
	<div class="avatar my-4">
		<div class="w-24 rounded mx-auto">
			<img src={getAvatarLink(user)} alt="Discord Avatar" width="96" height="96" />
		</div>
	</div>
	<h4 class="text-center uppercase mb-4 text-lightWhite">{user.username}</h4>

	<li>
		<a class="text-lg gap-4 text-lightWhite" href="/home"
			><img src={home} alt="home icon" width="15" height="15" />Home</a
		>
	</li>
	<li>
		<a class="text-lg gap-4 text-lightWhite" href="/polls"
			><img src={polls} alt="polls icon" width="15" height="15" />Polls</a
		>
	</li>
	<li>
		<a class="text-lg gap-4 text-lightWhite" href="/results"
			><img src={results} alt="results icon" width="15" height="15" />Results</a
		>
	</li>
	<div class="divider my-4" />
	<li>
		<Toggle let:on={open} let:toggle>
			<a class="text-lg gap-4 text-red-500 hover:text-red-500" href="/?logout=true" role="button">
				<img src={logout} alt="logout icon" width="15" height="15" />Logout
			</a>
			<Dialog {open} on:close={toggle}>
				<div slot="title">Logout Confirmation</div>
				<div class="px-6 py-3">Are you sure you want to logout?</div>
				<Button
					on:click={() => {
						console.log('Deleting item...');
					}}
					variant="fill"
					color="red"
				>
					Yes, delete item
				</Button>
				<Button>Cancel</Button>
			</Dialog>
		</Toggle>
	</li>
</ul>
<!-- <Button icon={mdiTrashCan} on:click={toggle} color="red">Delete</Button>
	<Dialog {open} on:close={toggle}>
	  <div slot="title">Are you sure?</div>
	  <div class="px-6 py-3">
		This will permanently delete the item and can not be undone.
	  </div>
	  <div slot="actions">
		<Button
		  on:click={() => {
			console.log("Deleting item...");
		  }}
		  variant="fill"
		  color="red"
		>
		  Yes, delete item
		</Button>
		<Button>Cancel</Button>
	  </div>
	</Dialog>
   -->
