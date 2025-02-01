import '../../js/bootstrap.js';

import { createInertiaApp } from '@inertiajs/vue3';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';

import { Ziggy } from '@/js/ziggy';
import { ZiggyVue } from 'ziggy-js';
import { setThemeOnLoad } from './theme.js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
	title: (title) => `${title ? title + ' | ' : ''}${appName} Admin`,
	resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
	setup({ App, props, plugin }) {
		return createApp({ render: () => h(App, props) })
			.use(plugin)
			.use(VueQueryPlugin)
			.use(ZiggyVue, Ziggy)
			.mount('body');
	},
	progress: {
		color: '#4B5563',
	},
});

setThemeOnLoad();
