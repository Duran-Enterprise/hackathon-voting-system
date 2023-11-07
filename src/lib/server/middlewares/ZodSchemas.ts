import { z } from 'zod';
import { ObjectId } from 'mongodb';

const ObjectIdOrString = z.union([z.string(), z.instanceof(ObjectId)]);

export const userDBZod = z.object({
	_id: ObjectIdOrString,
	username: z.string(),
	active: z.boolean()
});

export const newUserZod = userDBZod.omit({ _id: true }).partial();

export const choiceZod = z.object({
	choice: z.string(),
	voters: z.array(z.string())
});

export const pollDBZod = z.object({
	_id: ObjectIdOrString,
	pollDescription: z.string(),
	choices: z.array(choiceZod),
	startDate: z.date(),
	endDate: z.date()
});
export const newPollZod = pollDBZod
	.omit({ _id: true })
	.partial()
	.extend({
		choices: z.array(choiceZod).min(2)
	});

export const newVoteZod = z.object({
	_id: ObjectIdOrString,
	choice: z.string(),
	voter: z.string()
});
