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
	<div class="sidebar-menu-title">
		<i :class="`ri-${icon}${iconVariant ? '-line' : ''} text-lg`" />
		<slot />
	</div>
</template>
