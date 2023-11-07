import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	// Get search params here
	const url = new URL(request.url);
	const searchParams = url.searchParams;

	// get poll_id
	const poll_id = searchParams.get('poll_id');

	return {
		poll_id
	};
};

export const csr = true;
