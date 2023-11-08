// See https://kit.svelte.dev/docs/types#app

import type { DiscordUser } from './lib/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			verifiedUser: DiscordUser;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
