import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ViteAliases from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [sveltekit(), ViteAliases()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		reporters: ['verbose']
	}
});
