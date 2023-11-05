import { verifyToken } from '$lib/server/TokenFunctions/index.js';
import { responseGenerator } from '$lib/utils/index.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const { accessToken, tokenType } = await request.json();
	const verifiedUser = await verifyToken(tokenType, accessToken);

	if (!verifiedUser) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'You are not a daedalus member'
			})
		);
	}

	cookies.set('accessToken', accessToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60
	});
	cookies.set('tokenType', tokenType, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60
	});
	cookies.set('user', JSON.stringify(verifiedUser), {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60
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
