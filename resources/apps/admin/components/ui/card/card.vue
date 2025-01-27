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
			cn('card h-fit overflow-hidden rounded-lg border border-border bg-card text-card-foreground', classProp)
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
