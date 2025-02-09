<script setup>
	const props = defineProps({
		class: {
			type: String,
			required: false,
		}
	});
</script>

<template>
	<div class="animate-pulse bg-alabaster-200" v-bind="props" />
</template>