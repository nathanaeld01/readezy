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
						return `assets/${chunk.facadeModuleId
							.split('/pages/')[1]
							.split('.')[0]
							.replace(/\//g, '-')}.js`;
					}

					return 'assets/[name].js';
				},
				entryFileNames: 'assets/[name].js',
			},
		},
	},
	optimizeDeps: {
		exclude: ['@radix-ui/react-slot'],
	},
	plugins: [
		laravel({
			buildDirectory: 'build/admin',
			input: 'resources/admin/app.tsx',
			refresh: { paths: ['resources/views/admin.blade.php'] },
			ssr: 'resources/admin/ssr.tsx',
			ssrOutputDirectory: 'bootstrap/ssr/admin',
		}),
		react(),
	],
	resolve: {
		alias: {
			'@/admin': '/resources/admin',
			'~/': '/resources/js/',
		},
	},
});
