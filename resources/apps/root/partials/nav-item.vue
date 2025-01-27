<script setup>
    import { Link } from '@inertiajs/vue3';
    
    defineProps({
        href: {
            type: String,
            required: true
        }
    });
</script>

<template>
    <li>
        <Link class="nav-item" :class="{ active: route().current(href) }" :href="route(href)">
            <slot />
        </Link>
    </li>
</template>

<style lang="postcss">
    .navigation .nav-item {
        @apply relative inline-flex justify-center bg-transparent text-alabaster-800 font-medium leading-none py-3 px-5 transition-[background] duration-200 hover:bg-coffee-100 active:bg-coffee-200 hover:text-alabaster-950;

        &.active {
            @apply text-alabaster-950 font-semibold bg-coffee-200;
        }
    }
</style>