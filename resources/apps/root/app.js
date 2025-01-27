import "@/js/bootstrap";
import "../../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { VueQueryPlugin } from "@tanstack/vue-query";

import { ZiggyVue } from "ziggy-js";
import { Ziggy } from "@/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title ? title + " | " : ""}${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/root/${name}.vue`,
            import.meta.glob("./pages/root/**/*.vue")
        ),
    setup({ App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(VueQueryPlugin)
            .use(ZiggyVue, Ziggy)
            .mount("body");
    },
    progress: {
        color: "#4B5563",
    },
});
