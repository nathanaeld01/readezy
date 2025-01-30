<script>
	export default {
		name: 'Card',
	};
</script>

<script setup>
	import { cn } from '@/js/lib/utils';

	const { class: classProp, ...props } = defineProps({
		class: {
			type: [String, null],
			default: null,
		},
	});
</script>

<template>
	<div
		:class="
			cn('card border-border bg-card text-card-foreground h-fit overflow-hidden rounded-lg border', classProp)
		"
		v-bind="props"
	>
		<slot />
	</div>
</template>

<style lang="postcss">
	.card .card-header input {
		@apply w-full md:max-w-96;
	}
</style>
