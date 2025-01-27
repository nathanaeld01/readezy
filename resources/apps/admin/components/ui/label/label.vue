<script setup>
	import { Label } from 'radix-vue';

	import { cn } from '@/js/lib/utils';

	const { class: classes, ...props } = defineProps({
		for: { type: String, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});
</script>

<template>
	<Label
		v-bind="props"
		:class="
			cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', classes)
		"
	>
		<slot />
	</Label>
</template>
