import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { DefaultResponseAllPolls } from '@/types/index';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const pollsData: DefaultResponseAllPolls = await fetch('/api/v1/polls').then((res) => res.json());
	if (pollsData.status === 'fail') {
		throw redirect(302, '/something-went-wrong');
	}
	const polls = pollsData.data.result;
	const verifiedUser = locals.verifiedUser;
	const userPolls = polls.filter((poll) => {
		return poll.choices.some((choice) => {
			return choice.voters.includes(verifiedUser.username.toLowerCase());
		});
	});

	return { userPolls, verifiedUser };
};
