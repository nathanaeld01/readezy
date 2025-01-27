<script setup>
	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<li class="breadcrumb-separator" :class="props.class" role="presentation" aria-hidden="true">
		<slot>
			<i class="ri-arrow-right-s-line" />
		</slot>
	</li>
</template>
