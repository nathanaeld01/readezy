<script>
	export default {
		name: 'ThemeToggler',
	};
</script>

<script setup>
	import { useTheme } from '@/admin/theme';
	import { Button } from './ui/button';

	const { theme, toggleTheme } = useTheme();
</script>

<template>
	<Button variant="secondary" icon @click="toggleTheme">
		<i :class="theme === 'dark' ? 'ri-sun-fill' : 'ri-moon-fill'"></i>
	</Button>
</template>
