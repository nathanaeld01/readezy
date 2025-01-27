<script setup>
	import clsx from 'clsx';
	import { computed, inject } from 'vue';
	import SidebarContent from './sidebar-content.vue';
	import SidebarFooter from './sidebar-footer.vue';
	import SidebarHeader from './sidebar-header.vue';
	import SidebarOverlay from './sidebar-overlay.vue';

	const { toggle } = inject('sidebar');

	const classes = computed(() => clsx(!toggle.value && 'collapsed'));
</script>

<template>
	<aside class="sidebar" :class="classes">
		<div class="sidebar-wrapper">
			<SidebarHeader>
				<slot name="header" />
			</SidebarHeader>
			<SidebarContent>
				<slot />
			</SidebarContent>
			<SidebarFooter>
				<slot name="footer" />
			</SidebarFooter>
		</div>
	</aside>
	<SidebarOverlay />
</template>
