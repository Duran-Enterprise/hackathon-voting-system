import type { DefaultResponseAllPolls } from '@/types/index';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, fetch }) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;

	const poll_id = searchParams.get('poll_id');

	const pollsData: DefaultResponseAllPolls = await fetch('/api/v1/polls').then((res) => res.json());
	if (pollsData.status === 'fail') {
		throw redirect(302, '/something-went-wrong');
	}
	const polls = pollsData.data.result;

	return {
		poll_id,
		polls
	};
};

export const csr = true;
