import { verifyToken } from '@server/TokenFunctions';
import { validateId } from '@server/middlewares/ZodValidator';
import { Polls } from '@server/mongoDb/MongoDBProvider';
import { json, type RequestHandler } from '@sveltejs/kit';
import { responseGenerator } from '@utils/index';

export const PATCH: RequestHandler = async ({ request, params, cookies }) => {
	const { _id } = params;
	const { choice } = await request.json().catch((error) => {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'something went wrong',
				error
			})
		);
	});
	if (!choice) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'Provide a choice'
			})
		);
	}
	const validatedId = validateId(_id);
	if (!validatedId) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'invalid poll id'
			})
		);
	}

	const token = cookies.get('token');
	const user = verifyToken(token || '');
	if (!token || !user) {
		return json(
			responseGenerator({
				status: 'fail',
				message: 'invalid token'
			})
		);
	}
	const username = user.user.username;
	const result = await Polls.addVote({ _id: validatedId, choice, voter: username });
	return json(result);
};
