import type { DefaultResponse, ZodErrorResponse } from '@/types/index';
import { responseGenerator } from '@utils/index';

/**
 * Generate a response containing error details from an error object or a custom error message.
 *
 * @param {unknown} error - The error object or a custom error message.
 *
 * @returns {DefaultResponse} A response object indicating the status of the operation, including error details if available.
 */
export function errorGenerator(error: unknown): DefaultResponse {
	if (error instanceof Error) {
		const errors: ZodErrorResponse = { errors: {} };
		const errorData = JSON.parse(error.message);

		for (const err of errorData) {
			errors.errors[`${err.path[0]}-${err.code}`] = err.message;
		}

		return responseGenerator({
			status: 'fail',
			message: 'Something went wrong',
			error: errors
		});
	}
	return responseGenerator({
		status: 'fail',
		message: 'Something went wrong',
		error: { error }
	});
}
