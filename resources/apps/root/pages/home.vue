<script setup>
    import { Head } from '@inertiajs/vue3';
    import { useQuery } from '@tanstack/vue-query';
    import axios from 'axios';

    import { AppLayout } from '@/root/layouts';
    import Book from '@/root/components/book.vue';
    import Skeleton from '@/root/components/ui/skeleton/skeleton.vue';

    const { data, isLoading } = useQuery({
        queryKey: ['bestsellers'],
        queryFn: async () => {
            const { data } = await axios.get('/api/home/bestsellers');
            return data;
        },
    });
</script>

<template>
    <Head title="Home" />
    <AppLayout>
        <div class="container">
            <h2 class="mb-5">Bestsellers</h2>
            <div class="w-full flex flex-nowrap justify-between">
                <template v-if="isLoading">
                    <div v-for="i in 5" :key="i" class="max-w-60 w-full space-y-2">
                        <Skeleton class="aspect-book" />
                        <Skeleton class="h-4" />
                        <Skeleton class="h-4" />
                        <Skeleton class="w-1/4 h-4" />
                    </div>
                </template>
                <template v-else-if="data?.length">
                    <Book 
                        v-for="book in data"
                        :key="book.slug"
                        v-bind="book"
                    />
                </template>
            </div>
        </div>
    </AppLayout>
</template>
