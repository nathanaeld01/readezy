<script setup>
	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<span class="breadcrumb-page" :class="props.class" role="link" aria-disabled="true" aria-current="page">
		<slot />
	</span>
</template>
