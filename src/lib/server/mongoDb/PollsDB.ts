import { responseGenerator } from '@utils/index';
import { DATABASE } from '@server/configs';
import type { Collection, ObjectId } from 'mongodb';
import { ObjectId as ConvertToObjectId } from 'mongodb';
import type { newPoll, newVote, pollDBSchema } from '@server/schema';
import type { DefaultResponse } from '@/types/index';

/**
 * A class for managing poll-related operations in the database.
 *
 * methods:
 *
 * - insertPoll(poll: newPoll): Promise<DefaultResponse>
 * - findPoll(_id?: ObjectId): Promise<DefaultResponse>
 * - addVote(newVote: newVote): Promise<DefaultResponse>
 */
class PollsDB {
	private polls: Collection<pollDBSchema>;
	private newPolls: Collection<newPoll>;

	constructor() {
		this.polls = DATABASE.collection<pollDBSchema>('polls');
		this.newPolls = DATABASE.collection<newPoll>('polls');
	}

	/**
	 * Inserts a new poll into the database.
	 *
	 * @param {newPoll} poll - The poll data to be inserted. Must include a poll description, start date, end date and at least two choices.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If successful, it includes a success message and data about the inserted poll.
	 * - If there's an error, it includes a failure message and details about the error.
	 *
	 * @throws {Error} If there's an issue with the database operation.
	 */
	async insertPoll(poll: newPoll): Promise<DefaultResponse> {
		try {
			const result = await this.newPolls.insertOne(poll);
			return responseGenerator({
				status: 'success',
				message: `Poll added successfully, ID: ${result.insertedId}`,
				data: { result }
			});
		} catch (error) {
			return responseGenerator({
				status: 'fail',
				message: 'Something went wrong',
				error: { error }
			});
		}
	}
	/**
	 * Finds a poll in the database based on its unique identifier.
	 *
	 * @param {ObjectId} [_id] - The unique identifier of the poll to search for.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If the poll is found, it includes a success message and data about the poll.
	 * - If the poll is not found, it includes a "Not Found" message.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async findPoll(_id?: ObjectId | string): Promise<DefaultResponse> {
		try {
			if (typeof _id === 'string') {
				_id = new ConvertToObjectId(_id);
			}

			const result = await this.polls.findOne({ _id });
			const message = result ? 'Found' : 'Not Found';
			return responseGenerator({
				status: 'success',
				message: message,
				data: { result }
			});
		} catch (error) {
			return responseGenerator({
				status: 'fail',
				message: 'Something went wrong',
				error: { error }
			});
		}
	}
	/**
	 * Finds and retrieves all polls from the database.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If polls are found, it includes a success message and data about the retrieved polls.
	 * - If no polls are found, it includes a "Not Found" message.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async findAllPolls(): Promise<DefaultResponse> {
		try {
			const result = await this.polls.find({}).toArray();
			return responseGenerator({
				status: 'success',
				message: 'Found',
				data: { result }
			});
		} catch (error) {
			return responseGenerator({
				status: 'fail',
				message: 'Something went wrong',
				error: { error }
			});
		}
	}
	/**
	 * Adds a voter to a specific choice in the selected poll collection.
	 *
	 * @param {newVote} newVote - The information about the vote, including the poll's _id, choice, and the username of the voter.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If the vote is added successfully, it includes a success message.
	 * - If the vote is not added successfully, it includes a "Not Updated" message.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async addVote(newVote: newVote): Promise<DefaultResponse> {
		try {
			const { choice, voter } = newVote;
			let { _id } = newVote;

			if (typeof _id === 'string') {
				_id = new ConvertToObjectId(_id);
			}

			const updateOperation = {
				$addToSet: {
					'choices.$[choice].voters': voter
				}
			};
			const data = await this.canVote(_id, voter);
			if (data.status === 'fail') {
				return data;
			}

			const arrayFilters = [{ 'choice.choice': choice }];

			const result = await this.polls.updateOne({ _id }, updateOperation, { arrayFilters });

			const message = result ? 'Updated' : 'Not Updated';
			return responseGenerator({
				status: 'success',
				message: message,
				data: { result }
			});
		} catch (error) {
			return responseGenerator({
				status: 'fail',
				message: 'Something went wrong',
				error: { error }
			});
		}
	}
	/**
	 * Checks if a user with the specified username can vote in a poll.
	 *
	 * @param {ObjectId | string} _id - The unique identifier of the poll.
	 * @param {string} username - The username of the user to check.
	 * @returns {Promise<DefaultResponse | (Omit<DefaultResponse, 'data'> & { data: { _id: ObjectId; username: string } })>} A promise that resolves to a response indicating whether the user can vote or not.
	 */
	async canVote(
		_id: ObjectId | string,
		username: string
	): Promise<
		| DefaultResponse
		| (Omit<DefaultResponse, 'data'> & { data: { _id: ObjectId; username: string } })
	> {
		try {
			if (typeof _id === 'string') {
				_id = new ConvertToObjectId(_id);
			}
			const poll = await this.polls.findOne({ _id });
			if (!poll) {
				return responseGenerator({
					status: 'fail',
					message: 'Poll Not Found'
				});
			}

			const currentDate = new Date();
			if (currentDate < poll.startDate || currentDate > poll.endDate) {
				return responseGenerator({
					status: 'fail',
					message: 'Voting is not allowed at this time'
				});
			}

			const choices = poll.choices;
			for (const choice of choices) {
				if (choice.voters.includes(username)) {
					return responseGenerator({
						status: 'fail',
						message: 'Already Voted'
					});
				}
			}
			return responseGenerator({
				status: 'success',
				message: 'Can Vote',
				data: {
					_id,
					username
				}
			});
		} catch (error) {
			return responseGenerator({
				status: 'fail',
				message: 'Something went wrong',
				error: { error }
			});
		}
	}
}
export const Polls = new PollsDB();
