<script setup>
	import { cn } from '@/js/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	})
</script>

<template>
	<div :class="cn('py-6', props.class)">
		<slot />
	</div>
</template>