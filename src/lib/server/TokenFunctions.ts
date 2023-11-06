import { IS_DAEDALUS_MEMBER_VERIFICATION_LINK, TOKEN_EXPIRATION } from '$lib/types';
import type { TokenInfo, TokenPayload, DiscordUser } from '$lib/types';
import jwt from 'jsonwebtoken';

/**
 * Signs a JSON Web Token (JWT) with the provided payload using the private key.
 * @param payload - The data to be included in the JWT.
 * @returns The signed JWT with an expiration time of 1 hour.
 */
export function signToken(
	payload: TokenPayload,
	privateKey: string = import.meta.env.VITE_PRIVATE_KEY
) {
	const signedToken = jwt.sign(payload, privateKey, {
		expiresIn: TOKEN_EXPIRATION,
		algorithm: 'RS256',
		issuer: 'DDuran19'
	});
	return signedToken;
}
/**
 * Verifies the signature of a JWT using the provided public key and checks its issuer.
 * @param token - The JWT to be verified.
 * @returns The decoded payload if the JWT is valid; otherwise, returns null.
 */
export function verifyToken(token: string, publicKey: string = import.meta.env.VITE_PUBLIC_KEY) {
	try {
		const verifiedToken = jwt.verify(token, publicKey, {
			algorithms: ['RS256'],
			issuer: 'DDuran19'
		});
		return verifiedToken as TokenPayload;
	} catch (err) {
		return null;
	}
}
/**
 * Decodes a JWT to extract its payload without verifying the signature.
 * @param token - The JWT to be decoded.
 * @returns The decoded payload as a TokenInfo object, or null if the token is invalid.
 */
export function decodeToken(token: string) {
	try {
		const decodedToken = jwt.decode(token);
		return decodedToken as TokenInfo;
	} catch (err) {
		return null;
	}
}

/**
 * Verifies the authenticity of the token thru Discord API and returns the username.
 *
 * @param {string | undefined} tokenType - The type of the token.
 * @param {string | undefined} accessToken - The access token to be verified.
 * @return {Promise<null | DiscordUser>} A promise that resolves to a boolean or a DiscordUser.
 */
export async function verifyDiscordMember(
	tokenType: string | undefined,
	accessToken: string | undefined
): Promise<null | DiscordUser> {
	if (!tokenType || !accessToken) {
		return null;
	}
	try {
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
