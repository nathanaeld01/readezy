<script setup>
	import { onMounted, onUnmounted, provide, ref, watch } from 'vue';

	const state = localStorage.getItem('sidebar:state');
	const toggle = ref(state === 'true' || state === null);
	const onToggle = () => {
		toggle.value = !toggle.value;
		localStorage.setItem('sidebar:state', toggle.value.toString());
	};

	const isMobile = ref(window.innerWidth <= 992);

	const updateIsMobile = () => {
		isMobile.value = window.innerWidth <= 992;
	};

	onMounted(() => {
		window.addEventListener('resize', updateIsMobile);
		updateIsMobile();
	});

	onUnmounted(() => {
		window.removeEventListener('resize', updateIsMobile);
	});

	watch(isMobile, (newValue) => {
		if (newValue && toggle.value) {
			toggle.value = false;
		}
	});

	provide('sidebar', { toggle, onToggle, isMobile });
</script>

<template>
	<div class="wrapper">
		<slot />
	</div>
</template>
