import { verifyToken } from '@server/TokenFunctions';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.endsWith('/login')) {
		return await resolve(event);
	}
	if (event.url.pathname.startsWith('/api')) {
		const token = event.cookies.get('token');
		if (!token) {
			throw redirect(302, '/login');
		}

		const verifiedUser = verifyToken(token);
		if (!verifiedUser) {
			throw redirect(302, '/login');
		}
		return await resolve(event);
	}

	return await resolve(event);
};
