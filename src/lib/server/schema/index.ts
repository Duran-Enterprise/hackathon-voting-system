import type { ObjectId } from 'mongodb';

export type UsernameDB = string;

export type userDBSchema = {
	_id: ObjectId | string;
	username: UsernameDB;
	active: boolean;
};

export type newUser = Partial<Omit<userDBSchema, '_id'>>;

export type ChoiceDB = {
	choice: string;
	voters: UsernameDB[];
};

export type pollDBSchema = {
	_id: ObjectId | string;
	pollDescription: string;
	choices: ChoiceDB[];
	startDate: Date;
	endDate: Date;
};

export type newPoll = Partial<Omit<pollDBSchema, '_id'>> & {
	choices: ChoiceDB[] & { length: 2 };
};

export type newVote = Omit<
	pollDBSchema,
	'pollDescription' | 'startDate' | 'endDate' | 'choices'
> & {
	choice: string;
	voter: string;
};
