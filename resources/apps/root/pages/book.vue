<script setup>
	import { Head, usePage } from '@inertiajs/vue3';
	import { useQuery } from '@tanstack/vue-query';

	import { AppLayout, DetailsLayout } from '@/root/layouts';
	import { BookTitle, BookAuthor, BookActions, BookDetails } from '@/root/components/book';
	import Booklet from '@/root/components/booklet.vue';
	import Loading from '@/root/components/loading.vue';

	const { slug, title } = usePage().props;

	const { data, isLoading } = useQuery({
		queryKey: ['book', slug],
		queryFn: async () => {
			const { data } = await axios.get(`/api/book/${slug}`);
			return data;
		},
	});
</script>

<template>
	<Head :title />
	<AppLayout class="container layout-container">
		<DetailsLayout>
			<template #image>
				<Loading class="w-64 aspect-book" :isLoading>
					<Booklet :src="data?.book.image_url" :alt="title + ' Cover'" />
				</Loading>
			</template>
			<template #default>
				<BookTitle :data :isLoading />
				<BookActions :price="data?.book.price" :isLoading />
				<BookAuthor :data :isLoading />
				<BookDetails :data :isLoading />
			</template>
		</DetailsLayout>
	</AppLayout>
</template>

<style lang="postcss">
	.layout-article {
		@apply w-full;

		section {
			@apply p-8;
		}
	}

	.detail-row {
		@apply flex py-5;

		&:first-of-type {
			@apply pt-0;
		}

		&:last-of-type {
			@apply pb-0;
		}

		&:not(:last-of-type) {
			@apply border-b border-alabaster-200;
		}
	}
</style>