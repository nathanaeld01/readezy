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
	<div
		:class="
			cn(
				'flex min-h-14 w-full flex-col items-center justify-between gap-4 border-b border-b-border bg-popover p-2.5 pl-4 md:flex-row [&_input]:w-full md:[&_input]:max-w-96',
				props.class,
			)
		"
	>
		<slot />
	</div>
</template>
