import { TOKEN_EXPIRATION, type TokenPayload } from '@/types/index';
import { signToken, verifyDiscordMember } from '@server/TokenFunctions';
import { json, type RequestHandler } from '@sveltejs/kit';
import { responseGenerator } from '@utils/index';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { accessToken, tokenType } = await request.json();
	const verifiedUser = await verifyDiscordMember(tokenType, accessToken);

	if (!verifiedUser) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'You are not a daedalus member',
				error: { message: 'Unverified User' }
			})
		);
	}

	const payload: TokenPayload = {
		user: verifiedUser
	};
	const token = signToken(payload);
	cookies.set('token', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: TOKEN_EXPIRATION
	});

	return json(
		responseGenerator({
			status: 'success',
			data: {
				verifiedUser
			},
			message: 'Successfully authenticated'
		})
	);
};
