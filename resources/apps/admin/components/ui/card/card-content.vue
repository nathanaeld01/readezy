<script setup>
	defineProps({
		class: {
			type: [String, null],
			default: null,
		},
	})
</script>

<template>
	<div class="card-content" :class>
		<slot />
	</div>
</template>
