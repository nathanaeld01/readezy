<script setup>
	import { cn } from '@/js/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<span
		:class="
			cn(
				'inline-flex h-9 items-center justify-center px-3 py-1.5 text-sm font-normal text-foreground',
				props.class,
			)
		"
		role="link"
		aria-disabled="true"
		aria-current="page"
	>
		<slot />
	</span>
</template>
