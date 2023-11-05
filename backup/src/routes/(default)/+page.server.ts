import { deleteCookies } from '$lib/utils/index.js';

export const load = async ({ request, cookies }) => {
	const url = new URL(request.url);
	const logout = url.searchParams.get('logout');
	if (logout === 'true') {
		deleteCookies(cookies);
	}
	return {};
};
