<script setup>
	import { cn } from '@/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<tr
		:class="
			cn(
				'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted [thead_&]:bg-popover [thead_&]:hover:bg-popover',
				props.class,
			)
		"
	>
		<slot />
	</tr>
</template>
