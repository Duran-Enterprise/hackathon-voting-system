import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/TokenFunctions';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');
	const tokenType = cookies.get('tokenType');

	if (!accessToken) {
		throw redirect(302, '/login');
	}

	const verifiedUser = await verifyToken(tokenType, accessToken);

	if (!verifiedUser) {
		throw redirect(302, '/login');
	}

	return {
		verifiedUser: verifiedUser
	};
};
