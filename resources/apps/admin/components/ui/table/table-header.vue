<script setup>
	import { cn } from '@/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<thead :class="cn('[&_tr:last-child]:border-b [&_tr:last-child]:border-border', props.class)">
		<slot />
	</thead>
</template>
