<script setup>
	import { Head, usePage } from '@inertiajs/vue3';
	import { useQuery } from '@tanstack/vue-query';

	import { AppLayout, DetailsLayout } from '@/root/layouts';

	const { slug, title } = usePage().props;

	const { data, isLoading } = useQuery({
		queryKey: ['author', slug],
		queryFn: async () => {
			const { data } = await axios.get(`/api/author/${slug}`);
			return data;
		},
	})
</script>

<template>
	<Head :title />
	<AppLayout class="container layout-container">
		<DetailsLayout>
			<template #image>
				<div class="w-64 aspect-book shadow-book overflow-hidden lg:sticky lg:top-28">
					<img class="size-full object-cover" :src="data?.image_url" :alt="data?.title + ' Image'" />
				</div>
			</template>
			<template #default>
			</template>
		</DetailsLayout>
	</AppLayout>
</template>