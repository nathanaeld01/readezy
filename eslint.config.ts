import jslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tslint from 'typescript-eslint';

export default tslint.config(
	jslint.configs.recommended,
	...tslint.configs.recommended,
	react.configs.flat.recommended,
	perfectionist.configs['recommended-natural'],
	prettier,
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'side-effect-style',
						['builtin', 'external'],
						['internal', 'parent', 'sibling'],
					],
					internalPattern: ['^@/.*'],
					newlinesBetween: 'always',
				},
			],
			'react/react-in-jsx-scope': 'off',
		},
	},
	{
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
			parserOptions: {
				project: './tsconfig.json', // Ensure ESLint respects TypeScript config
			},
			sourceType: 'module',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
);
