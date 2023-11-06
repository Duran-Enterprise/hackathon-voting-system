import { verifyToken } from '@server/TokenFunctions';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');
	const tokenType = cookies.get('tokenType');

	const verifiedUser = await verifyToken(tokenType, accessToken);
	if (verifiedUser !== null) {
		throw redirect(302, '/home');
	}

	return {};
};
