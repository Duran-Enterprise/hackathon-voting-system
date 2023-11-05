import { verifyToken } from '$lib/server/TokenFunctions';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');
	const tokenType = cookies.get('tokenType');

	const verifiedUser = await verifyToken(tokenType, accessToken);
	if (verifiedUser !== null) {
		throw redirect(302, '/home');
	}

	return {};
};
