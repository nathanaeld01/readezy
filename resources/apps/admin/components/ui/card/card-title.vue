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
	<h3 :class="cn(props.class)" v-bind="props">
		<slot />
	</h3>
</template>
