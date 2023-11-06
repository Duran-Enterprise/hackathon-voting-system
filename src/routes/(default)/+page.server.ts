import { deleteCookies } from '@utils/index';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, cookies }) => {
	const url = new URL(request.url);
	const logout = url.searchParams.get('logout');
	if (logout === 'true') {
		deleteCookies(cookies);
	}
	return {};
};
