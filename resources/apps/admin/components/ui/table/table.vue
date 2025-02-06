<script setup>
	import { cn } from '@/lib/utils';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<div class="relative w-full overflow-auto rounded-lg border border-border bg-card">
		<table :class="cn('w-full table-auto caption-bottom text-sm', props.class)">
			<slot />
		</table>
	</div>
</template>
