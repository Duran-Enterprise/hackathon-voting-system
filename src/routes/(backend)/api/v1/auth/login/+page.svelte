<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let messageFromServer = '';
	onMount(async () => {
		const fragment = new URLSearchParams(window.location.hash.slice(1));
		const accessToken = fragment.get('access_token');
		const tokenType = fragment.get('token_type');
		const expiresIn = fragment.get('expires_in');
		await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ accessToken, tokenType, expiresIn })
		})
			.then(async (response) => {
				const data = await response.json();
				if (data.status === 'fail') {
					messageFromServer = data.message;
					goto('/login');
				}
				if (data.status === 'success') {
					goto('/home', { invalidateAll: false });
				}
			})
			.catch((error) => {
				messageFromServer = error.message;
			});
	});
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="modalForm p-8 rounded-lg shadow-lg w-96 space-y-4 text-center">
		<span class="loading loading-bars loading-lg" />
		<h1 class="text-4xl font-semibold">Authenticating...</h1>
		<p class="text-gray-600">You will be redirected to the new page shortly.</p>
		<p class="text-gray-600">Stuck on this page? <a href="/">click here</a>.</p>
		<p class="text-red-600">{messageFromServer}</p>
	</div>
</div>
