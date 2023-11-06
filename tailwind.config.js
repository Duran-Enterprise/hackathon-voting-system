/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				darkBackground: '#212121',
				accent: '#4ca8a9',
				buttonColor: '#5d5dde',
				darkBlack: '#030303',
				lightGray: '#353A40',
				purple: '#7A52B3',
				lightGreen: '#00B7BF',
				lightWhite: '#F4FCFF'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
