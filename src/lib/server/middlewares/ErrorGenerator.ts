import type { ZodErrorResponse } from '@/types/index';

/**
 * Generate a ZodErrorResponse from an error object or return the original error.
 *
 * @param {unknown} error - The error object to be transformed.
 *
 * @returns {ZodErrorResponse | unknown} An object containing an array of error details, where each detail is represented as an object with key-value pairs, or the original error if it's not an instance of Error.
 */
export function errorGenerator(error: unknown): ZodErrorResponse | unknown {
	if (error instanceof Error) {
		const errors: ZodErrorResponse = { errors: [] };
		const errorData = JSON.parse(error.message);

		for (const err of errorData) {
			const errorObject = {
				[`${err.path[0]}-${err.code}`]: err.message
			};
			errors.errors.push(errorObject);
		}

		return errors;
	}
	return error;
}
