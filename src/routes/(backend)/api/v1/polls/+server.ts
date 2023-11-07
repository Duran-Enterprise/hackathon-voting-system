import { Polls } from '@server/mongoDb/MongoDBProvider';
import { json, type RequestHandler } from '@sveltejs/kit';
import { responseGenerator } from '@utils/index';

export const GET: RequestHandler = async () => {
	const polls = await Polls.findAllPolls();

	return json(responseGenerator(polls));
};
