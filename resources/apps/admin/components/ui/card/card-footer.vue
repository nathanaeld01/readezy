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
	<div :class="cn('flex border-t border-border px-4 py-2.5', props.class)">
		<slot />
	</div>
</template>
