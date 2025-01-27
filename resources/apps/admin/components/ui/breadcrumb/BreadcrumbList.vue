<script setup>
	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<ol class="breadcrumb-list" :class="props.class">
		<slot />
	</ol>
</template>
