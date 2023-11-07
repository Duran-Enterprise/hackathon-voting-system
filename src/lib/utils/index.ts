import { openCreatePollModal, openVotePollModal } from '$lib/stores';
import type { DefaultResponse, DiscordUser, Modals } from '@/types/index';
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
const PROD_SERVER = import.meta.env.VITE_PROD_SERVER;
export function getRedirectLink() {
	const REDIRECT_URI = import.meta.env.VITE_ON_DEV === 'true' ? DEV_SERVER : PROD_SERVER;

	const redirectLink = `https://discord.com/api/oauth2/authorize?client_id=1170585102821105805&redirect_uri=${REDIRECT_URI}%2Fapi%2Fv1%2Fauth%2Flogin&response_type=token&scope=identify%20guilds.members.read`;
	return redirectLink;
}

export function getAvatarLink(user: DiscordUser, size: number = 300) {
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`;
}

export function getRandomQuote() {
	const quotes = [
		{
			text: 'Genius is one percent inspiration and ninety-nine percent perspiration.',
			author: 'Thomas Edison, type.fit'
		},
		{
			text: 'You can observe a lot just by watching.',
			author: 'Yogi Berra, type.fit'
		},
		{
			text: 'A house divided against itself cannot stand.',
			author: 'Abraham Lincoln, type.fit'
		},
		{
			text: 'Difficulties increase the nearer we get to the goal.',
			author: 'Johann Wolfgang von Goethe, type.fit'
		},
		{
			text: 'Fate is in your hands and no one elses',
			author: 'Byron Pulsifer, type.fit'
		},
		{
			text: 'Be the chief but never the lord.',
			author: 'Lao Tzu, type.fit'
		},
		{
			text: 'Nothing happens unless first we dream.',
			author: 'Carl Sandburg, type.fit'
		},
		{
			text: 'Well begun is half done.',
			author: 'Aristotle, type.fit'
		},
		{
			text: 'Life is a learning experience, only if you learn.',
			author: 'Yogi Berra'
		},
		{
			text: 'Self-complacency is fatal to progress.',
			author: 'Margaret Sangster, type.fit'
		},
		{
			text: 'Peace comes from within. Do not seek it without.',
			author: 'Buddha, type.fit'
		},
		{
			text: 'What you give is what you get.',
			author: 'Byron Pulsifer, type.fit'
		},
		{
			text: 'We can only learn to love by loving.',
			author: 'Iris Murdoch, type.fit'
		},
		{
			text: 'Life is change. Growth is optional. Choose wisely.',
			author: 'Karen Clark, type.fit'
		},
		{
			text: "You'll see it when you believe it.",
			author: 'Wayne Dyer, type.fit'
		},
		{
			text: 'Today is the tomorrow we worried about yesterday.',
			author: 'type.fit'
		}
	];
	const randomIndex = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
}
