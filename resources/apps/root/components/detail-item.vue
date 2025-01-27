<script>
	export default {
		name: "DetailItem",
	};
</script>

<script setup>
	import Loading from './loading.vue';

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		loadingClass: {
			type: String,
			required: false,
		},
		loadingNumber: {
			type: Number,
			default: 1,
		},
		isLoading: {
			type: Boolean,
			default: true,
		},
	})
</script>

<template>
	<div class="detail-item">
		<div class="detail-title">
			<span>{{ props.title }}</span>
		</div>
		<div class="detail-content">
			<Loading :isLoading :quantity="props.loadingNumber" class="h-4">
				<slot />
			</Loading>
		</div>
	</div>
</template>

<style lang="postcss">
	.detail-item {
		@apply w-full;

		.detail-title {
			@apply font-semibold;
		}

		.detail-content {
			@apply mt-1 space-y-4;
		}
	}
</style>