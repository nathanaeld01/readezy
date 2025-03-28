import './web.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = 'ReadEzy';

createInertiaApp({
	title: title => (title ? `${title} | ${appName}` : appName),
	resolve: name =>
		resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),

	setup({ el, App, props }) {
		if (import.meta.env.SSR) {
			hydrateRoot(el, <App {...props} />);
			return;
		}

		createRoot(el).render(<App {...props} />);
	},
	progress: false,
});
