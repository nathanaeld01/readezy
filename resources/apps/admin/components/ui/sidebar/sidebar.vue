<script setup>
	import { inject } from 'vue';

	import { cn } from '@/js/lib/utils';
	import SidebarContent from './sidebar-content.vue';
	import SidebarFooter from './sidebar-footer.vue';
	import SidebarHeader from './sidebar-header.vue';
	import SidebarOverlay from './sidebar-overlay.vue';

	const { toggle } = inject('sidebar');
</script>

<template>
	<aside
		:class="
			cn(
				'fixed top-0 left-0 z-50 size-full max-w-75 overflow-hidden border-r border-border bg-card transition-[max-width] duration-200 lg:relative',
				!toggle && 'max-w-0',
			)
		"
	>
		<div class="grid h-full w-75 grid-rows-[auto_1fr_auto]">
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
