import { openCreatePollModal, openVotePollModal } from '$lib/stores';
import type { DefaultResponse, Modals } from '@/types/index';
import type { Cookies } from '@sveltejs/kit';

/**
 * Generates a response using the provided DefaultResponse object.
 *
 * This does nothing but ensure that the response is in the correct format.
 * @param {DefaultResponse} response - The response object to generate.
 * @return {DefaultResponse} The generated response.
 */
export function responseGenerator(response: DefaultResponse): DefaultResponse {
	return response;
}

export function deleteCookies(cookies: Cookies) {
	try {
		cookies.delete('token');
	} catch (err) {
		//
	}
}

export function toggleModal(modalName: Modals) {
	switch (modalName) {
		case 'createPoll':
			return openCreatePollModal.update((value) => !value);
		case 'VotePoll':
			return openVotePollModal.update((value) => !value);
		default:
			return;
	}
}

export function openModal(modalName: Modals) {
	switch (modalName) {
		case 'createPoll':
			return openCreatePollModal.set(true);
		case 'VotePoll':
			return openVotePollModal.set(true);
		default:
			return;
	}
}

export function closeModal(modalName: Modals) {
	switch (modalName) {
		case 'createPoll':
			return openCreatePollModal.set(false);
		case 'VotePoll':
			return openVotePollModal.set(false);
		default:
			return;
	}
}

const DEV_SERVER = 'http://localhost:5173';
const PROD_SERVER = 'https://hackathon-voting-system.pages.dev';
export function getRedirectLink() {
	const REDIRECT_URI = import.meta.env.VITE_ON_DEV === 'true' ? DEV_SERVER : PROD_SERVER;
	const redirectLink = `https://discord.com/api/oauth2/authorize?client_id=1170585102821105805&redirect_uri=${REDIRECT_URI}%2Fapi%2Fv1%2Fauth%2Flogin&response_type=token&scope=identify%20guilds.members.read`;
	return redirectLink;
}
