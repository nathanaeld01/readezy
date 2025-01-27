<script setup>
    import { ref, onMounted } from 'vue';
    import NavItem from '@/root/partials/nav-item.vue';
    import Logo from './logo.vue';
    import Cart from '@/root/components/cart.vue';

    const isScrolled = ref(false);

    onMounted(() => {
        let ticking = false;

        const scrollHandler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    isScrolled.value = window.scrollY > 0;
                    ticking = false;
                });
                ticking = true;
            }
        };

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    })
</script>

<template>
    <header class="header" :class="{ scrolled: isScrolled }">
        <div class="container header-wrap">
            <div class="brand">
                <Logo class="mt-2 h-10 fill-alabaster-950" />
            </div>
            <nav class="navigation">
                <ul class="nav-wrap">
                    <NavItem href="home">Home</NavItem>
                    <NavItem href="series">Series</NavItem>
                </ul>
                <div class="flex items-center gap-2">
                    <Cart />
                </div>
            </nav>
        </div>
    </header>
</template>

<style lang="postcss">
    .header {
        @apply fixed top-0 left-0 z-50 w-full h-20 px-4 bg-alabaster-100 shadow-none transition-shadow duration-500;
    }

    .header.scrolled {
        @apply shadow-lg shadow-alabaster-950/15;
    }

    .header::after {
        @apply absolute bottom-0 inset-x-0 z-[1] content-[''] container h-px bg-alabaster-400 transition-[max-width] duration-500 pointer-events-none;
    }

    .header.scrolled::after {
        @apply max-w-full;
    }

    .header .header-wrap {
        @apply h-full flex items-center gap-16 justify-between;
    }

    .navigation {
        @apply w-full flex justify-between items-center; 
    }

    .navigation .nav-wrap {
        @apply flex items-center gap-2.5;
    }
</style>