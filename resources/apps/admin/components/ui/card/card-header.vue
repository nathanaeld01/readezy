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
	<div
		:class="
			cn(
				'card-header flex min-h-14 w-full flex-col items-center justify-between gap-4 border-b border-b-border bg-popover p-2.5 pl-4 md:flex-row',
				classProp,
			)
		"
		v-bind="props"
	>
		<slot />
	</div>
</template>
