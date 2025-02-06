<script setup>
	import { cn } from '@/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<td :class="cn('px-4 py-2.5 align-middle', props.class)">
		<slot />
	</td>
</template>
