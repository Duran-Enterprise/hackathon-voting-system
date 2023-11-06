import type { DefaultResponse } from '@/types/index';
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
