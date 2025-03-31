import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route, RouteName } from 'ziggy-js';

const appName = 'ReadEzy Admin';

createServer(page =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		resolve: name =>
			resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
		setup: ({ App, props }) => {
			/* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

			return <App {...props} />;
		},
		title: title => (title ? `${title} | ${appName}` : appName),
	}),
);
