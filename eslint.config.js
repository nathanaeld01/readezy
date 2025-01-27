import jslint from '@eslint/js';
import prettierConfig from '@vue/eslint-config-prettier';
import eslintVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
	jslint.configs.recommended,
	...eslintVue.configs['flat/recommended'],
	prettierConfig,
	{
		files: ['**/*.{js,mjs,cjs,vue}'],
		rules: {
			'no-undef': 'off',
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		files: ['resources/apps/**/*.vue'],
		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/require-default-prop': 'off',
		},
	},
	{
		files: ['resources/apps/admin/**/*.{js,vue}'],
		rules: {
			'prettier/prettier': [
				'warn',
				{
					tailwindConfig: './tailwind.admin.config.js',
				},
			],
		},
	},
	{
		files: ['resources/apps/root/**/*.{js,vue}'],
		rules: {
			'prettier/prettier': [
				'warn',
				{
					tailwindConfig: './tailwind.app.config.js',
				},
			],
		},
	},
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
];
