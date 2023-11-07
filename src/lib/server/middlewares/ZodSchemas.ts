import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const ObjectIdOrString = z.union([z.string(), z.instanceof(ObjectId)]);

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

const pastDate = z.date().refine(
	(value) => {
		const today = new Date();
		return value >= today;
	},
	{
		message: "Start date can't be in the past"
	}
);

export const newPollZod = z
	.object({
		pollDescription: z
			.string()
			.min(5, { message: 'Poll description must be at least 5 characters long' }),
		choices: z.array(choiceZod).min(2, { message: 'Must have at least two choices' }),
		startDate: pastDate,
		endDate: z.date()
	})
	.refine(
		({ startDate, endDate }) => {
			return endDate >= startDate;
		},
		{
			message: 'End date must be after start date'
		}
	);

export const newVoteZod = z.object({
	_id: ObjectIdOrString,
	choice: z.string(),
	voter: z.string()
});
