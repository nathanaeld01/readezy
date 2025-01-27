<script setup>
	import ThemeToggler from '../components/theme-toggler.vue';
	import { Breadcrumb } from '../components/ui/breadcrumb';
	import { SidebarTrigger } from '../components/ui/sidebar';

	const { links } = defineProps({
		links: {
			type: Array,
			default: () => [],
		},
	});

	const defaultLink = links ? { name: 'Home', href: '/' } : {};
</script>

<template>
	<header class="flex h-15 w-full items-center justify-between border-b border-b-border px-4">
		<div class="flex items-center gap-4">
			<SidebarTrigger />
			<Breadcrumb :links="[defaultLink, ...links]" />
		</div>
		<ThemeToggler />
	</header>
</template>

<style lang="postcss"></style>
