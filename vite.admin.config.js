import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            buildDirectory: 'build/admin',
            input: 'frontend/admin/app.tsx',
            ssr: 'frontend/admin/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@/admin": "/frontend/admin",
            "ziggy-js": "/vendor/tightenco/ziggy/dist",
        },
    },
})