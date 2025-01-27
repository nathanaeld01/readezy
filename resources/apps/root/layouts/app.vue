<script setup>
    import Navigation from '@/root/partials/navigation.vue';

    const props = defineProps({
        class: {
            type: String,
            default: ''
        }
    });
</script>

<template>
    <Navigation />
    <main class="wrapper" v-bind="props">
        <slot />
    </main>
</template>