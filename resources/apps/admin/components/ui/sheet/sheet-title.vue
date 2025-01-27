<script setup>
	import { cn } from '@/lib/utils';
	import { DialogTitle } from 'radix-vue';

	const { class: classes, ...props } = defineProps({
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});
</script>

<template>
	<DialogTitle :class="cn('text-foreground text-lg font-semibold leading-none', classes)" v-bind="props">
		<slot />
	</DialogTitle>
</template>
