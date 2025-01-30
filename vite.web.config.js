import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

import tailwind from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		laravel({
			buildDirectory: 'build/web',
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
		tailwind(),
	],
	css: {
		postcss: {
			config: path.resolve(__dirname, 'postcss.config.js'),
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
