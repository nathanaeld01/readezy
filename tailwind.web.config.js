import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';
import animations from './resources/js/animations';

export default {
	content: ['./resources/views/app.blade.php', './resources/apps/root/**/*.vue', './resources/apps/root/**/*.js'],
	corePlugins: {
		container: false,
	},
	theme: {
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1400px',
		},
		colors: {
			white: 'hsl(0, 0%, 100%)',
			black: 'hsl(0, 0%, 0%)',
			transparent: 'transparent',
			coffee: {
				DEFAULT: 'hsl(30, 30%, 47%)',
				50: 'hsl(38, 33%, 95%)',
				100: 'hsl(38, 31%, 88%)',
				200: 'hsl(38, 31%, 77%)',
				300: 'hsl(35, 31%, 64%)',
				400: 'hsl(32, 31%, 53%)',
				500: 'hsl(30, 30%, 47%)',
				600: 'hsl(25, 31%, 40%)',
				700: 'hsl(19, 30%, 33%)',
				800: 'hsl(18, 25%, 29%)',
				900: 'hsl(14, 24%, 26%)',
				950: 'hsl(12, 28%, 14%)',
			},
			alabaster: {
				DEFAULT: 'hsl(51, 32%, 91%)',
				50: 'hsl(50, 30%, 96%)',
				100: 'hsl(51, 32%, 91%)',
				200: 'hsl(52, 31%, 77%)',
				300: 'hsl(49, 31%, 65%)',
				400: 'hsl(46, 32%, 56%)',
				500: 'hsl(41, 31%, 50%)',
				600: 'hsl(36, 31%, 44%)',
				700: 'hsl(29, 30%, 37%)',
				800: 'hsl(27, 28%, 31%)',
				900: 'hsl(26, 26%, 26%)',
				950: 'hsl(25, 31%, 14%)',
			},
			raisin: {
				50: '#f8f7f8',
				100: '#f0eeee',
				200: '#ded9da',
				300: '#c1b8bb',
				400: '#9f9196',
				500: '#847379',
				600: '#6c5d62',
				700: '#584c50',
				800: '#4b4144',
				900: '#41393b',
				950: '#231f20',
			},
			gray: {
				50: 'hsl(0, 0%, 96%)',
				100: 'hsl(0, 0%, 91%)',
				200: 'hsl(0, 0%, 82%)',
				300: 'hsl(0, 0%, 69%)',
				400: 'hsl(0, 0%, 53%)',
				500: 'hsl(0, 0%, 43%)',
				600: 'hsl(0, 0%, 36%)',
				700: 'hsl(0, 0%, 31%)',
				800: 'hsl(0, 0%, 27%)',
				900: 'hsl(0, 0%, 20%)',
				950: 'hsl(0, 0%, 15%)',
			},
		},
		extend: {
			fontFamily: {
				jost: ['Jost', 'sans-serif'],
				cormorant: ['Cormorant Garamond', 'serif'],
			},
			boxShadow: {
				book: '-20px 20px 20px 0px #0000006b',
			},
			aspectRatio: {
				book: '5 / 7.5',
			},
			spacing: {
				15: '3.75rem',
				66: '16.5rem',
				75: '18.75rem',
			},
			gridTemplateColumns: {
				'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
			},
			gridTemplateRows: {
				'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			transitionDuration: {
				400: '400ms',
			},
		},
	},
	plugins: [
		forms,
		// require("tailwindcss-animate"),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.book-inset-shadow': {
					boxShadow: '1px 0 3px rgba(255, 255, 255, 0.1)',
				},
				'.container': {
					'@apply w-full mx-auto px-4 sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] xxl:max-w-[1320px]':
						'',
				},
			});
		}),
		animations,
	],
};
