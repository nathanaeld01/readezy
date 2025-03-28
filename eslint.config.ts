import globals from 'globals';
import jslint from '@eslint/js';
import tslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier/recommended';

export default tslint.config(
	jslint.configs.recommended,
	...tslint.configs.recommended,
	react.configs.flat.recommended,
	prettier,
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				project: './tsconfig.json', // Ensure ESLint respects TypeScript config
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
);
