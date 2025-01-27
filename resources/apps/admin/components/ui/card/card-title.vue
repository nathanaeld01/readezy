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
	<h3 :class="cn('card-title', classProp)" v-bind="props">
		<slot />
	</h3>
</template>
