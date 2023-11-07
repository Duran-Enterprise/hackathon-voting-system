import { verifyToken } from '@server/TokenFunctions';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Poll } from '@/types/index';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(302, '/login');
	}

	const verifiedUser = verifyToken(token);
	if (!verifiedUser) {
		throw redirect(302, '/login');
	}

	const samplePolls: Poll[] = [
		{
			id: 1,
			pollDescription: 'Who will win this Hackathon?',
			choices: ['Cast Away', 'Cast Away', 'Cast Away', 'Cast Away'],
			startDate: new Date(),
			endDate: new Date()
		},
		{
			id: 2,
			pollDescription: "What's the best framework?",
			choices: ['Svelte', 'Vue', 'React', 'Angular'],
			startDate: new Date(),
			endDate: new Date()
		},
		{
			id: 3,
			pollDescription: 'What is your favorite color?',
			choices: ['Red', 'Blue', 'Green', 'Yellow'],
			startDate: new Date(),
			endDate: new Date()
		}
	];

	return {
		verifiedUser: verifiedUser.user,
		polls: samplePolls
	};
};

export const csr = true;
