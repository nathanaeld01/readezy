<script setup>
    const props = defineProps({
        src: {
            type: String,
            required: false
        },
        alt: {
            type: String,
            required: false,
        },
    });
</script>

<template>
    <div class="booklet shadow-book">
        <img v-bind="props" />
    </div>
</template>

<style lang="postcss">
    .booklet {
        @apply relative w-64 aspect-book overflow-hidden;
    }

    .booklet::after {
        @apply absolute inset-0 left-[10px] z-1 content-[''] w-[3px] bg-black/10 book-inset-shadow pointer-events-none;
    }

    .booklet > img {
        @apply size-full object-cover;
    }
</style>