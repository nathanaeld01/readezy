import './web.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = 'ReadEzy';

createInertiaApp({
	progress: false,
	resolve: name =>
		resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),

	setup({ App, el, props }) {
		if (import.meta.env.SSR) {
			hydrateRoot(el, <App {...props} />);
			return;
		}

		createRoot(el).render(<App {...props} />);
	},
	title: title => (title ? `${title} | ${appName}` : appName),
});
