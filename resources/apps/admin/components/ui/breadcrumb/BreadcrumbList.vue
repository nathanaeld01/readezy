<script setup>
	import { cn } from '@/js/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<ol :class="cn('flex flex-wrap items-center gap-1 text-sm break-words text-muted-foreground', props.class)">
		<slot />
	</ol>
</template>
