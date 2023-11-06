import type { DiscordUser } from '@/types/index';

/**
 * Verifies the authenticity of the token thru Discord API and returns the username.
 *
 * @param {string | undefined} tokenType - The type of the token.
 * @param {string | undefined} accessToken - The access token to be verified.
 * @return {Promise<null | DiscordUser>} A promise that resolves to a boolean or a DiscordUser.
 */
export async function verifyToken(
	tokenType: string | undefined,
	accessToken: string | undefined
): Promise<null | DiscordUser> {
	if (!tokenType || !accessToken) {
		return null;
	}
	try {
		const DAEDALUS_SERVER_ID = '1150126011036487723';
		const IS_DAEDALUS_MEMBER_VERIFICATION_LINK = `https://discord.com/api/users/@me/guilds/${DAEDALUS_SERVER_ID}/member`;

		const { user, message } = await fetch(IS_DAEDALUS_MEMBER_VERIFICATION_LINK, {
			headers: {
				authorization: `${tokenType} ${accessToken}`
			}
		}).then((result) => result.json());
		console.log({ user, message });
		if (message === 'Unknown Guild') {
			return null;
		}
		return user;
	} catch (e) {
		return null;
	}
}
