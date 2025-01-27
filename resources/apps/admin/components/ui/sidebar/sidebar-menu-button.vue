<script setup>
	defineProps({
		icon: {
			type: String,
			required: true,
		},
		collapsible: {
			type: Boolean,
			default: false,
		},
		iconVariant: {
			type: Boolean,
			default: true,
		},
	});
</script>

<template>
	<button type="button" class="sidebar-menu-button">
		<span class="label">
			<i :class="`ri-${icon}${iconVariant ? '-line' : ''} text-lg`" />
			<span>
				<slot />
			</span>
		</span>
		<i v-if="collapsible" class="ri-arrow-down-s-line text-lg" />
	</button>
</template>
