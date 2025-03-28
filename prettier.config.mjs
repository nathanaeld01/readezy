export default {
	printWidth: 100,
	useTabs: true,
	tabWidth: 4,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	arrowParens: 'avoid',
	plugins: ['prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: ['resources/admin/**/*.{ts,tsx}'],
			options: {
				tailwindStylesheet: './resources/admin/admin.css',
				tailwindFunctions: ['clsx', 'cva', 'cn'],
			},
		},
		{
			files: ['resources/web/**/*.{ts,tsx}'],
			options: {
				tailwindStylesheet: './resources/web/web.css',
				tailwindFunctions: ['clsx', 'cva', 'cn'],
			},
		},
	],
};
