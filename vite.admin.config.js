import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
	plugins: [
		laravel({
			ssrOutputDirectory: 'bootstrap/ssr/admin',
			buildDirectory: 'build/admin',
			input: 'resources/admin/app.tsx',
			ssr: 'resources/admin/ssr.tsx',
			refresh: {
				paths: ['resources/views/admin.blade.php'],
			},
		}),
		react(),
	],
	resolve: {
		alias: {
			'@/admin': '/resources/admin',
			'~/': '/resources/js/',
		},
	},
	optimizeDeps: {
		exclude: ['@radix-ui/react-slot'],
	},
});
