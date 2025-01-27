import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

import autoprefixer from 'autoprefixer';
import noDuplicate from 'postcss-combine-duplicated-selectors';
import tailwindcss from 'tailwindcss';
import tailwindNesting from 'tailwindcss/nesting';

export default defineConfig({
	plugins: [
		laravel({
			buildDirectory: 'admin',
			ssr: ['resources/apps/admin/ssr.js'],
			input: ['resources/apps/admin/app.js'],
			refresh: {
				paths: ['resources/views/admin.blade.php'],
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
				tailwindcss({
					config: 'tailwind.admin.config.js',
				}),
				autoprefixer,
				tailwindNesting,
				noDuplicate,
			],
		},
	},
	resolve: {
		alias: {
			'@/admin': path.resolve('resources/apps/admin'),
			'@/js': path.resolve('resources/js'),
			'ziggy-js': path.resolve('vendor/tightenco/ziggy/dist/index.js'),
		},
	},
});
