<script>
	export default {
		name: "BookAuthor",
	};
</script>

<script setup>
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
	<section class="grid grid-cols-[auto_1fr] gap-8">
		<div class="size-16 bg-alabaster-200 rounded-full overflow-hidden" :class="{ 'animate-pulse': isLoading }">
			<img v-if="!isLoading" :src="data?.author.image_url" :alt="data?.author.title + ' Image'" />
		</div>
		<div class="w-full">
			<p class="text-xl font-semibold">About the Author</p>
			<div v-if="isLoading" class="mt-2 space-y-1">
				<Skeleton class="h-4 rounded-md" />
				<Skeleton class="h-4 rounded-md" />
				<Skeleton class="h-4 rounded-md" />
				<Skeleton class="h-4 rounded-md" />
			</div>
			<div v-else class="mt-2">
				<p v-for="para in data?.author.description">{{ para }}</p>
			</div>
		</div>
	</section>
</template>