import { validateId } from '@server/middlewares/ZodValidator';
import { Users } from '@server/mongoDb/MongoDBProvider';
import { json, type RequestHandler } from '@sveltejs/kit';
import { responseGenerator } from '@utils/index';

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
