import { validateNewPoll } from '@server/middlewares/ZodValidator';
import { Polls } from '@server/mongoDb/PollsDB';
import type { newPoll } from '@server/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { responseGenerator } from '@utils/index';

export const GET: RequestHandler = async () => {
	const polls = await Polls.findAllPolls();

	return json(responseGenerator(polls));
};
export const POST: RequestHandler = async ({ request }) => {
	const { pollDescription, choices, startDate, endDate, title } = await request
		.json()
		.catch((error) => {
			return json(
				responseGenerator({
					status: 'fail',
					message: 'something went wrong',
					error
				})
			);
		});
	const parsedStartDate = new Date(startDate);
	const parsedEndDate = new Date(endDate);
	const newPoll: newPoll = {
		pollDescription,
		title,
		choices,
		startDate: parsedStartDate,
		endDate: parsedEndDate
	};

	const validatedPoll = validateNewPoll(newPoll);
	if (validatedPoll.status === 'fail') {
		return json(validatedPoll);
	}
	const result = await Polls.insertPoll(newPoll);
	return json(responseGenerator(result));
};
