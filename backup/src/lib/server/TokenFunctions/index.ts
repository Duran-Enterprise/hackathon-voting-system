/**
 * Verifies a token of a given type.
 *
 * @param {string | undefined} tokenType - The type of the token.
 * @param {string | undefined} accessToken - The access token to be verified.
 * @return {Promise<null | string>} A promise that resolves to a boolean or a string.
 */
export async function verifyToken(
	tokenType: string | undefined,
	accessToken: string | undefined
): Promise<null | string> {
	if (!tokenType || !accessToken) {
		return null;
	}
	const DAEDALUS_SERVER_ID = '1150126011036487723';
	const IS_DAEDALUS_MEMBER_VERIFICATION_LINK = `https://discord.com/api/users/@me/guilds/${DAEDALUS_SERVER_ID}/member`;

	const { user, message } = await fetch(IS_DAEDALUS_MEMBER_VERIFICATION_LINK, {
		headers: {
			authorization: `${tokenType} ${accessToken}`
		}
	}).then((result) => result.json());
	if (message === 'Unknown Guild') {
		return null;
	}
	return user.username;
}
