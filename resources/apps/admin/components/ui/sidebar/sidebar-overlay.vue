<script setup>
	import { inject } from 'vue';

	const { toggle, onToggle, isMobile } = inject('sidebar');
</script>

<template>
	<div v-if="isMobile && toggle" class="sidebar-overlay" role="button" @click="onToggle" />
</template>
