import { writable } from 'svelte/store';
import type { Poll } from '../types';

export const openCreatePollModal = writable(false);
export const openVotePollModal = writable(false);
export const samplePolls: Poll[] = [
	{
		id: 1,
		pollDescription: 'Who will win this Hackathon?',
		choices: [
			{ choice: 'Cast Away', votes: 2 },
			{ choice: 'Cast Away', votes: 3 },
			{ choice: 'Cast Away', votes: 5 }
		],
		startDate: new Date(),
		endDate: new Date(),
		voters: [
			'DDuran19',
			'CodeMaster456',
			'CoderPro987',
			'ProgrammerXYZ',
			'DeveloperABC',
			'CodeLover789',
			'ProgrammerQWE',
			'CoderRTS',
			'CodeEnthusiastFDS',
			'ProgrammerASD'
		]
	},
	{
		id: 2,
		pollDescription: "What's the best framework?",
		choices: [
			{ choice: 'Svelte', votes: 1 },
			{ choice: 'Vue', votes: 4 },
			{ choice: 'React', votes: 5 }
		],
		startDate: new Date(),
		endDate: new Date(),
		voters: [
			'RandomUser123',
			'CodeMaster456',
			'CoderPro987',
			'DDuran19',
			'DeveloperABC',
			'CodeLover789',
			'ProgrammerQWE',
			'CoderRTS',
			'CodeEnthusiastFDS',
			'ProgrammerASD'
		]
	},
	{
		id: 3,
		pollDescription: 'What is your favorite color?',
		choices: [
			{ choice: 'Red', votes: 2 },
			{ choice: 'Blue', votes: 5 },
			{ choice: 'Green', votes: 3 }
		],
		startDate: new Date(),
		endDate: new Date(),
		voters: [
			'RandomUser123',
			'CodeMaster456',
			'CoderPro987',
			'ProgrammerXYZ',
			'DeveloperABC',
			'CodeLover789',
			'ProgrammerQWE',
			'CoderRTS',
			'CodeEnthusiastFDS',
			'ProgrammerASD'
		]
	}
];
