import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name].[ext]',
				chunkFileNames: chunk => {
					if (chunk.facadeModuleId?.includes('/pages/')) {
						return `pages/${chunk.facadeModuleId
							.split('/pages/')[1]
							.split('.')[0]
							.replace(/\//g, '-')}.js`;
					}

					return 'chunks/[name].js';
				},
				entryFileNames: '[name].js',
			},
		},
	},
	plugins: [
		laravel({
			buildDirectory: 'build/web',
			input: 'resources/web/app.tsx',
			refresh: {
				paths: ['resources/views/web.blade.php'],
			},
			ssr: 'resources/web/ssr.tsx',
			ssrOutputDirectory: 'bootstrap/ssr/web',
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
