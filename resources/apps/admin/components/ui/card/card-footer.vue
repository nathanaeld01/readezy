<script setup lang="ts">
	import { cn } from '@/js/lib/utils';

	const { class: classProp, ...props } = defineProps({
		class: {
			type: [String, null],
			default: null,
		},
	});
</script>

<template>
	<div :class="cn('card-footer flex border-t border-border px-4 py-2.5', classProp)" v-bind="props">
		<slot />
	</div>
</template>
