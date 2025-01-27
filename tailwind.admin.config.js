import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';
import animations from './resources/js/animations';

export default {
	content: ['./resources/views/admin.blade.php', './resources/apps/admin/**/*.vue', './resources/apps/admin/**/*.js'],
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
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))',
			},
			info: 'hsl(var(--info))',
			success: 'hsl(var(--success))',
			warning: 'hsl(var(--warning))',
			error: 'hsl(var(--error))',
		},
		extend: {
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
				'.container': {
					'@apply w-full mx-auto px-4 sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] xxl:max-w-[1320px]':
						'',
				},
			});
		}),
		animations,
	],
};
