import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { DefaultResponseAllPolls } from '@/types/index';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const pollsData: DefaultResponseAllPolls = await fetch('/api/v1/polls').then((res) => res.json());
	if (pollsData.status === 'fail') {
		throw redirect(302, '/something-went-wrong');
	}
	const polls = pollsData.data.result;
	const verifiedUser = locals.verifiedUser;
	return { polls, verifiedUser };
};

export const actions: Actions = {
	submitVote: async ({ request, fetch }) => {
		const { pollId, choice } = Object.fromEntries(
			await request.formData().catch((error) => {
				throw redirect(302, `/polls?voted=fail&message=${error.message}`);
			})
		) as {
			pollId: string;
			choice: string;
		};
		console.log({ pollId, choice });
		const data = await fetch(`/api/v1/polls/${pollId}/vote`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				choice
			})
		})
			.then((res) => res.json())
			.catch((error) => {
				throw redirect(302, `/polls?voted=fail&message=${error.message}`);
			});

		if (data.status === 'fail') {
			throw redirect(302, `/polls?voted=fail&message=${data.message}`);
		}
		throw redirect(302, '/polls?voted=success');
	}
};
