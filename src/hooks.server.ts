import { verifyToken } from '@server/TokenFunctions';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	if (path.endsWith('/login')) {
		return await resolve(event);
	}

	const protectedRoutes = ['/api', '/home', '/results', '/polls'];

	if (protectedRoutes.includes(path)) {
		const token = event.cookies.get('token');
		if (!token) {
			throw redirect(302, '/login');
		}
		const verifiedUser = verifyToken(token);
		if (!verifiedUser) {
			throw redirect(302, '/login');
		}
		event.locals.verifiedUser = verifiedUser.user;

		return await resolve(event);
	}

	return await resolve(event);
};
