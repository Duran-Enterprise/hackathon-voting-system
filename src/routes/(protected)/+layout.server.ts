import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const verifiedUser = locals.verifiedUser;
	return { verifiedUser };
};

export const csr = true;
