<script>
	export default {
		name: 'Card',
	};
</script>

<script setup>
	import { cn } from '@/js/lib/utils';

	const props = defineProps({
		class: {
			type: [String, null],
			default: null,
		},
	});
</script>

<template>
	<div :class="cn('h-fit overflow-hidden rounded-lg border border-border bg-card text-card-foreground', props.class)">
		<slot />
	</div>
</template>
