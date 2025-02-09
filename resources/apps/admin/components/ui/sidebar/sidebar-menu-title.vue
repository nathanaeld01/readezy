<script setup>
	defineProps({
		icon: {
			type: String,
			required: true,
		},
		iconVariant: {
			type: Boolean,
			default: true,
		},
	});
</script>

<template>
	<div class="flex h-8 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground">
		<i :class="`ri-${icon}${iconVariant ? '-line' : ''} text-lg`" />
		<slot />
	</div>
</template>
