<script setup>
	import { Skeleton } from './ui/skeleton';

	const { isLoading, quantity, ...props } = defineProps({
		class: {
			type: String,
			default: '',
		},
		quantity: {
			type: Number,
			default: 1,
		},
		isLoading: {
			type: Boolean,
			required: true,
		}
	});
</script>

<template>
	<template v-if="isLoading">
		<div class="space-y-1">
			<Skeleton v-for="i in quantity" :key="i" class="rounded-md" v-bind="props" />
		</div>
	</template>
	<template v-else>
		<slot />
	</template>
</template>