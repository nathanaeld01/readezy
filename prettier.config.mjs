export default {
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
			"files": ["frontend/admin/**/*.{ts,tsx}"],
			"options": {
				"tailwindStylesheet": "./resources/css/admin.css",
				"tailwindFunctions": ["clsx", "cva", "cn"]
			}
		},
		{
			"files": ["frontend/web/**/*.{ts,tsx}"],
			"options": {
				"tailwindStylesheet": "./resources/css/root.css",
				"tailwindFunctions": ["clsx", "cva", "cn"]
			}
		}
    ]
}