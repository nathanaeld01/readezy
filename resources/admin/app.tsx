import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { route } from 'ziggy-js';

const appName = 'ReadEzy Admin';

axios.interceptors.response.use(
	// Success handler - return response as is
	response => response,
	// Error handler
	error => {
		const errorInfo = {
			message: error.response.data || 'An error occurred',
			status: error.response?.status,
		};
		return Promise.reject(errorInfo);
	},
);

createInertiaApp({
	progress: false,
	resolve: name =>
		resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
	setup({ App, el, props }) {
		if (import.meta.env.SSR) {
			hydrateRoot(el, <App {...props} />);
			return;
		}

		createRoot(el).render(
			<QueryClientProvider client={new QueryClient()}>
				<App {...props} />
			</QueryClientProvider>,
		);
	},
	title: title => (title ? `${title} | ${appName}` : appName),
});

window.route = route;
