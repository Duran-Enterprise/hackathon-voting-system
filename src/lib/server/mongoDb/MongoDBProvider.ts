import { responseGenerator } from '@utils/index';
import { DATABASE } from '@server/databaseFunctions';
import type { Collection, ObjectId } from 'mongodb';
import { ObjectId as ConvertToObjectId } from 'mongodb';
import type { newPoll, newUser, newVote, pollDBSchema, userDBSchema } from '@server/schema';
import type { DefaultResponse } from '@/types/index';

/**
 * A class for managing user-related operations in the database.
 *
 * Methods:
 *
 * - insertUser(user: newUser): Promise<DefaultResponse>
 * - findUser(query: Partial<Omit<userDBSchema, 'active'>>): Promise<DefaultResponse>
 * - updateStatus(_id: ObjectId, active: boolean): Promise<DefaultResponse>
 */
class UsersDB {
	private users: Collection<userDBSchema>;
	private newUsers: Collection<newUser>;
	constructor() {
		this.users = DATABASE.collection<userDBSchema>('users');
		this.newUsers = DATABASE.collection<newUser>('users');
	}
	/**
	 * Inserts a new user into the database.
	 *
	 * @param {newUser} user - The user data to be inserted. It should include a username and an active status.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If successful, it includes a success message and data about the inserted user.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async insertUser(user: newUser): Promise<DefaultResponse> {
		try {
			const result = await this.newUsers.insertOne(user);
			return responseGenerator({
				status: 'success',
				message: `User added successfully, ID: ${result.insertedId}`,
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
	 * Finds a user in the database based on the specified criteria.
	 *
	 * @param {Partial<Omit<userDBSchema, 'active'>>} query - The criteria to search for a user, excluding the 'active' field.
	 * - Includes either 'username' or '_id'
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If the user is found, it includes a success message and data about the user.
	 * - If the user is not found, it includes a "Not Found" message.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async findUser(query: Partial<Omit<userDBSchema, 'active'>>): Promise<DefaultResponse> {
		try {
			const result = await this.users.findOne({ $or: [query] });
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
	 * Updates the status (active or inactive) of a user in the database.
	 *
	 * @param {ObjectId} _id - The unique identifier of the user whose status is to be updated.
	 * @param {boolean} active - The new status (true for active, false for inactive) for the user.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If the update is successful, it includes a success message and data about the updated user.
	 * - If the update is not successful, it includes a "Not Updated" message.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async updateStatus(_id: ObjectId | string, active: boolean): Promise<DefaultResponse> {
		try {
			if (typeof _id === 'string') {
				_id = new ConvertToObjectId(_id);
			}
			const result = await this.users.updateOne({ _id }, { $set: { active } });
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
	 * Finds and retrieves all users from the database.
	 *
	 * @returns {Promise<DefaultResponse>} A promise that resolves to a response object indicating the status of the operation.
	 * - If users are found, it includes a success message and data about the retrieved users.
	 * - If no users are found, it includes a "Not Found" message.
	 * - If there's an error, it includes a failure message and details about the error.
	 */
	async findAllUsers(): Promise<DefaultResponse> {
		try {
			const result = await this.users.find({}).toArray();
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
}

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
			const { _id, choice, voter } = newVote;
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
export const Users = new UsersDB();
export const Polls = new PollsDB();
