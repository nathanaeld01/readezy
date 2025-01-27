import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

import autoprefixer from 'autoprefixer';
import noDuplicate from 'postcss-combine-duplicated-selectors';
import tailwind from 'tailwindcss';
import tailwindNesting from 'tailwindcss/nesting';

export default defineConfig({
	plugins: [
		laravel({
			buildDirectory: 'web',
			ssr: ['resources/apps/root/ssr.js'],
			input: ['resources/apps/root/app.js'],
			refresh: {
				paths: ['resources/views/root.blade.php'],
			},
		}),
		vue({
			template: {
				transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
			},
		}),
	],
	css: {
		postcss: {
			plugins: [
				tailwind({
					config: 'tailwind.web.config.js',
				}),
				autoprefixer,
				tailwindNesting,
				noDuplicate,
			],
		},
	},
	resolve: {
		alias: {
			'@/root': path.resolve('resources/apps/root'),
			'@/js': path.resolve('resources/js'),
			'ziggy-js': path.resolve('vendor/tightenco/ziggy/dist/index.js'),
		},
	},
});
