import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		laravel({
			ssrOutputDirectory: 'bootstrap/ssr/web',
			buildDirectory: 'build/web',
			input: 'resources/web/app.tsx',
			ssr: 'resources/web/ssr.tsx',
			refresh: {
				paths: ['resources/views/web.blade.php'],
			},
		}),
		react(),
	],
	resolve: {
		alias: {
			'@/web': '/resources/web',
			'~/': '/resources/js/',
		},
	},
});
