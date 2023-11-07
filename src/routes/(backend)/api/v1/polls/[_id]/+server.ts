import { Polls } from '@server/mongoDb/MongoDBProvider';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { _id } = params;
	const poll = await Polls.findPoll(_id);
	return json(poll);
};
