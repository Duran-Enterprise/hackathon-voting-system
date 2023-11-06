import { verifyToken } from '@server/TokenFunctions';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(302, '/login');
	}

	const verifiedUser = verifyToken(token);
	if (!verifiedUser) {
		throw redirect(302, '/login');
	}

	return {
		verifiedUser: verifiedUser.user
	};
};

export const csr = true;
