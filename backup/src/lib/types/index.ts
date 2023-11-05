export type DefaultResponse = {
	status: 'success' | 'fail';
	message?: string;
	data?: {
		[key: string]: string | number | boolean | undefined | null | object;
		count?: number;
	};
	error?: object;
};
