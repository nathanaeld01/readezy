<script setup>
	import { cn } from '@/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<div :class="cn('flex gap-2 px-5 py-6', props.class)">
		<slot />
	</div>
</template>
