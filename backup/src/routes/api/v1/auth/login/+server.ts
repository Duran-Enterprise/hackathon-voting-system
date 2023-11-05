import { verifyToken } from '$lib/server/TokenFunctions/index.js';
import { responseGenerator } from '$lib/utils/index.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const { accessToken, tokenType } = await request.json();
	const username = await verifyToken(tokenType, accessToken);

	if (!username) {
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
		path: '/'
	});
	cookies.set('tokenType', tokenType, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		path: '/'
	});
	cookies.set('username', username, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
		path: '/'
	});
	return json(
		responseGenerator({
			status: 'success',
			data: {
				username
			},
			message: 'Successfully authenticated'
		})
	);
};
