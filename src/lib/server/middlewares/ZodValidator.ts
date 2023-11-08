import type { newPoll } from '@server/schema';
import { newPollZod } from './ZodSchemas';
import { errorGenerator } from './ErrorGenerator';
import type { DefaultResponse } from '@/types/index';
import { responseGenerator } from '@utils/index';
import type { ObjectId } from 'mongodb';
import { ObjectId as ConvertedToObjectId } from 'mongodb';
/**
 * Validate a new poll using a Zod schema and return a response indicating the validation result.
 *
 * @param {newPoll} newPoll - The new poll data to be validated.
 *
 * @returns {DefaultResponse} A response indicating the validation status and, if successful, includes the validated new poll data. If validation fails, it provides error details in the response.
 */
export function validateNewPoll(newPoll: newPoll): DefaultResponse {
	try {
		newPollZod.parse(newPoll);
		return responseGenerator({
			status: 'success',
			message: 'Poll validated successfully',
			data: newPoll
		});
	} catch (error) {
		return errorGenerator(error);
	}
}

export function validateId(_id: string | undefined): null | ObjectId {
	try {
		if (typeof _id === 'string') {
			return new ConvertedToObjectId(_id);
		}

		throw new Error('ID must be a string');
	} catch (error) {
		return null;
	}
}
