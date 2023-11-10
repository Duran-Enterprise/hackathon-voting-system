import CreatePollModal from '@components/CreatePollModal.svelte';
import { fireEvent, render, screen, cleanup } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('CreatePollModal', () => {
	beforeEach(() => {
		render(CreatePollModal);
	});
	afterEach(() => {
		cleanup();
	});
	it('has a form title', () => {
		const title = screen.getByText('Create a Poll');
		expect(title).toBeTruthy();
	});
	it('has input for poll title', () => {
		const input = screen.getByLabelText('Poll Title');
		expect(input).toBeTruthy();
	});
	it('has input for poll description', () => {
		const description = screen.getByLabelText('Poll Description');
		expect(description).toBeTruthy();
	});
	it('has date inputs for startDate and endDate', () => {
		const startDate = screen.getByTitle('Enter the start date of this poll');
		const endDate = screen.getByTitle('Enter the end date of this poll');
		expect(startDate).toBeTruthy();
		expect(endDate).toBeTruthy();
	});
	it('adds a new option when the "+ Add Option" button is clicked', async () => {
		await fireEvent.click(screen.getByText('+ Add Option'));

		expect(screen.getAllByTitle('Enter a new choice').length).toBe(3);
	});
	it('removes an option when the delete button is clicked', async () => {
		const deleteChoices = screen.getAllByTitle('Delete Option');

		await fireEvent.click(screen.getByText('+ Add Option'));
		await fireEvent.click(deleteChoices[0]);

		expect(screen.getAllByTitle('Enter a new choice').length).toBe(2);
	});
});
