import { verifyToken } from '@server/TokenFunctions';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { samplePolls } from '$lib/stores';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(302, '/login');
	}

	const verifiedUser = verifyToken(token);
	if (!verifiedUser) {
		throw redirect(302, '/login');
	}
	const verifiedUsername = verifiedUser.user.username.toLowerCase();
	const userPolls = samplePolls.filter((poll) => {
		return poll.voters.some((voter) => voter.toLowerCase() === verifiedUsername);
	});

	return {
		verifiedUser: verifiedUser.user,
		polls: samplePolls,
		userPolls
	};
};

export const csr = true;
