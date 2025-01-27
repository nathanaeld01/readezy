<script setup>
	import { cn } from '@/lib/utils';
	import { DialogDescription } from 'radix-vue';

	const { class: c, ...props } = defineProps({
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});
</script>

<template>
	<DialogDescription :class="cn('text-muted-foreground text-sm', c)" v-bind="props">
		<slot />
	</DialogDescription>
</template>
