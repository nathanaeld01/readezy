import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		laravel({
			buildDirectory: 'build/web',
			input: 'frontend/web/app.tsx',
			ssr: 'frontend/web/ssr.tsx',
			refresh: {
				paths: ['resources/views/web.blade.php'],
			},
		}),
		react(),
	],
	resolve: {
		alias: {
			'@/web': '/frontend/web',
			'@/admin': '/frontend/admin',
			'~/': '/resources/js/',
			'ziggy-js': '/vendor/tightenco/ziggy/dist',
		},
	},
});
