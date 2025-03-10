import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
	plugins: [
		laravel({
			buildDirectory: 'build/admin',
			input: 'frontend/admin/app.tsx',
			ssr: 'frontend/admin/ssr.tsx',
			refresh: {
				paths: ['resources/views/admin.blade.php'],
			},
		}),
		react(),
	],
	resolve: {
		alias: {
			'@/admin': '/frontend/admin',
			'@/web': '/frontend/web',
			'~/': '/resources/js/',
			'ziggy-js': '/vendor/tightenco/ziggy/dist',
		},
	},
});
