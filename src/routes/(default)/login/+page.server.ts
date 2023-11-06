import { verifyToken } from '@server/TokenFunctions';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) {
		return {};
	}
	const verifiedUser = verifyToken(token);
	console.log({ verifiedUser });
	if (verifiedUser !== null) {
		throw redirect(302, '/home');
	}
	return {};
};
