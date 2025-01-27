<script setup>
    import { Link } from '@inertiajs/vue3';

    const props = defineProps({
        slug: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: Object,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <div class="book-item">
        <Link :href="`/book/${props.slug}`" class="book-cover">
            <img :src="props.image_url" :alt="props.title + ' Cover'" class="book-image" />
            <div class="book-layer">
                Read More
            </div>
        </Link>
        <div>
            <div class="book-author">
                <Link :href="`/author/${props.author.slug}`">{{ props.author.title }}</Link>
            </div>
            <div class="book-title">
                <Link :href="`/book/${props.slug}`">{{ props.title }}</Link>
            </div>
            <div class="book-price">
                <span>₹ {{ props.price }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
    .book-item {
        @apply block w-full max-w-60;

        .book-cover {
            @apply relative block w-full aspect-book;
        }

        .book-author {
            @apply mt-2 text-[#999999] text-xs tracking-[.35em] uppercase;
        }

        .book-title {
            @apply text-xl font-semibold font-cormorant tracking-[0.01em] hover:text-coffee-800;
        }

        .book-price {
            @apply font-cormorant text-lg;
        }

        &:hover .book-layer {
            @apply opacity-100;
        }
    }

    .book-cover {
        .book-image {
            @apply w-full h-full object-cover;
        }

        .book-layer {
            @apply absolute top-0 left-0 z-[1] flex size-full bg-coffee-800/95 text-white text-xs tracking-widest font-semibold items-center justify-center opacity-0 transition-opacity duration-300 uppercase;
        }
    }
</style>