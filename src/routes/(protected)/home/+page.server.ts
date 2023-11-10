import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Choice, DefaultResponseAllPolls, Poll } from '@/types/index';

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

export const actions: Actions = {
	createPoll: async ({ request, fetch }) => {
		const data = Object.fromEntries(
			await request.formData().catch((error) => {
				console.log(error);
				throw redirect(302, `/home?voted=fail&message=${error.message}`);
			})
		);
		let index = 0;

		const poll: Omit<Poll, '_id'> = {
			pollDescription: data.pollDescription as string,
			title: data.title as string,
			choices: [],
			startDate: new Date(data.startDate as string),
			endDate: new Date(data.endDate as string)
		};
		while (data[`choices${index}`] !== undefined) {
			const choice: Choice = {
				choice: data[`choices${index}`] as string,
				voters: []
			};
			poll.choices.push(choice);
			index++;
		}

		const result = await fetch('/api/v1/polls', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(poll)
		}).then((res) => res.json());
		if (result.status === 'success') {
			throw redirect(302, '/polls?created=true&message=poll created');
		}
		return { errors: result.error.errors as Record<string, string> };
	}
};
