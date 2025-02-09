<script setup>
	import { inject } from 'vue';

	const { toggle, onToggle, isMobile } = inject('sidebar');
</script>

<template>
	<div
		v-if="isMobile && toggle"
		class="fixed top-0 left-0 z-49 size-full bg-black/50"
		role="button"
		@click="onToggle"
	/>
</template>
