<script>
	export default {
		name: "BookTitle",
	};
</script>

<script setup>
	import { Link } from '@inertiajs/vue3';
	import { Skeleton } from '../ui/skeleton';

	const { data, isLoading } = defineProps({
		data: {
			type: Object,
			required: false,
		},
		isLoading: {
			type: Boolean,
			default: true,
		},
	});
</script>

<template>
	<section class="text-center lg:text-left">
		<template v-if="isLoading">
			<Skeleton class="h-10 rounded-md mb-4" />
			<Skeleton class="h-4 rounded-md w-1/4" />
		</template>
		<template v-else>
			<h1 class="mb-4">{{ data?.book.title }}</h1>
			<Link :href="`/author/${data?.author.slug}`" class="font-semibold inline-block">{{ data?.author.title }}</Link>
		</template>
	</section>
</template>