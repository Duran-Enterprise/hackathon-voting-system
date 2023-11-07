import type { ZodErrorResponse } from '@/types/index';

export function errorGenerator(error: Error) {
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
}
