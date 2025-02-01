<script setup>
	const props = defineProps({
		class: {
			type: [String, null],
			default: null,
		},
	});
</script>

<template>
	<div :class="props.class">
		<slot />
	</div>
</template>
