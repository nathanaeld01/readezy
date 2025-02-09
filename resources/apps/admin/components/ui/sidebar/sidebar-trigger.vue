<script setup>
	import { inject } from 'vue';
	import { Button } from '../button';

	const { onToggle } = inject('sidebar');
</script>

<template>
	<Button variant="ghost" class="rounded-md" icon @click="onToggle">
		<i class="ri-layout-left-line" />
		<span class="sr-only">Toggle Sidebar</span>
	</Button>
</template>
