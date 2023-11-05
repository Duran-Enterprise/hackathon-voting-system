export type DefaultResponse = {
	status: 'success' | 'fail';
	message?: string;
	data?: {
		[key: string]: string | number | boolean | undefined | null | object;
		count?: number;
	};
	error?: object;
};

export type DiscordUser = {
	id: string;
	username: string;
	discriminator: string;
	avatar: string;
	verified: boolean;
	email: string;
	flags: number;
	banner: string;
	accent_color: number;
	premium_type: number;
	public_flags: number;
};
