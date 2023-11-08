import { validateId } from '@server/middlewares/ZodValidator';
import { Users } from '@server/mongoDb/MongoDBProvider';
import { json, type RequestHandler } from '@sveltejs/kit';
import { responseGenerator } from '@utils/index';

/**
 *
 *  Retrieves a user with the given ID.
 *
 * */
export const GET: RequestHandler = async ({ params }) => {
	const { _id } = params;
	const validated_id = validateId(_id);
	if (!validated_id) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'invalid id'
			})
		);
	}
	const user = await Users.findUser({ _id: validated_id });
	return json(user);
};

/**
 * Updates the status of a user with the given ID to false.
 *
 * */
export const DELETE: RequestHandler = async ({ params }) => {
	const { _id } = params;
	const validated_id = validateId(_id);

	if (!validated_id) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'invalid id'
			})
		);
	}
	const user = await Users.updateStatus(validated_id, false);
	return json(user);
};

/**
 * Updates the status of a user with the given ID.
 *
 * Defaults to setting active status of user to true, unless `active` query parameter is set to `false`.
 */
export const PATCH: RequestHandler = async ({ params, url }) => {
	const { _id } = params;
	const validated_id = validateId(_id);
	let active = true;
	if (url.searchParams.get('active') === 'false') {
		active = false;
	}

	if (!validated_id) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'invalid id'
			})
		);
	}
	const user = await Users.updateStatus(validated_id, active);
	return json(user);
};
