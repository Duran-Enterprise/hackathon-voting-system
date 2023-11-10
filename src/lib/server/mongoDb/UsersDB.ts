import type { DefaultResponse } from '@/types/index';
import { DATABASE } from '@server/configs';
import { ObjectId as ConvertToObjectId } from 'mongodb';
import type { userDBSchema, newUser } from '@server/schema';
import { responseGenerator } from '@utils/index';
import type { Collection, ObjectId } from 'mongodb';

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

export const Users = new UsersDB();
