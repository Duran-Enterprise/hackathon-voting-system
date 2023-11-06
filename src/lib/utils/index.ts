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
		cookies.delete('accessToken');
		cookies.delete('tokenType');
		cookies.delete('user');
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
