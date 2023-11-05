<script lang="ts">
	const DEV_REDIRECT_LINK = `https://discord.com/api/oauth2/authorize?client_id=1170585102821105805&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fv1%2Fauth%2Flogin&response_type=token&scope=identify%20guilds.members.read`;
</script>

<a href={DEV_REDIRECT_LINK} role="button">Login via Discord</a>
