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

export type Poll = {
	id: number;
	pollDescription: string;
	choices: string[];
	startDate: Date;
	endDate: Date;
};
export enum Modals {
	CreatePoll = 'createPoll',
	VotePoll = 'VotePoll'
}

export const OFFICIAL_ISSUER = 'DDuran19';
export type ISSUER = 'DDuran19';
export const TOKEN_EXPIRATION = 3600;

export type TokenPayload = {
	user: DiscordUser;
};
export type TokenInfo = TokenPayload & {
	iat: number;
	exp: number;
	iss: ISSUER;
};

const DAEDALUS_SERVER_ID = '1150126011036487723';
export const DAEDALUS_SERVER_INVITE = 'https://discord.gg/daedalusdev';
export const IS_DAEDALUS_MEMBER_VERIFICATION_LINK = `https://discord.com/api/users/@me/guilds/${DAEDALUS_SERVER_ID}/member`;
