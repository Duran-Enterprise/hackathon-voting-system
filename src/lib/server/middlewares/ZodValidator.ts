import type { newPoll } from '@server/schema';
import { newPollZod } from './ZodSchemas';
import { errorGenerator } from './ErrorGenerator';
import type { ZodErrorResponse } from '@/types/index';

/**
 * Validate a new poll using a Zod schema and return the validated data or an error response.
 *
 * @param {newPoll} newPoll - The new poll data to be validated.
 *
 * @returns {newPoll | ZodErrorResponse | unknown} The validated new poll data if it passes validation, or an error response if validation fails.
 */
export function validateNewPoll(newPoll: newPoll): newPoll | ZodErrorResponse | unknown {
	try {
		newPollZod.parse(newPoll);
		return newPoll;
	} catch (error) {
		return errorGenerator(error);
	}
}
