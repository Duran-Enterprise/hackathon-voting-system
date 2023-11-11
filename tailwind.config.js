/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svelte-ux/**/*.{svelte,js}'],
	theme: {
		extend: {
			colors: {
				primary: '#2563eb',
				darkBackground: '#212121',
				accent: '#4ca8a9',
				buttonColor: '#5d5dde',
				darkBlack: '#111214',
				lightGray: '#353A40',
				purple: '#7A52B3',
				lightGreen: '#00B7BF',
				lightWhite: '#F4FCFF'
			}
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif']
		}
	},
	plugins: [
		require('svelte-ux/plugins/tailwind.cjs'),
		require('@tailwindcss/typography'),
		require('daisyui')
	]
};
