import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		laravel({
			buildDirectory: 'build/admin',
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
		tailwindcss(),
	],
	css: {
		postcss: {
			config: path.resolve(__dirname, 'postcss.config.js'),
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
