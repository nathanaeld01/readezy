<script setup>
	import { Toaster } from '@/admin/components/ui/sonner';
	import { SidebarProvider } from '../components/ui/sidebar';
	import Sidebar from './sidebar.vue';
	import Topbar from './topbar.vue';

	const props = defineProps({
		class: {
			type: String,
			default: '',
		},
		links: {
			type: Array,
			default: () => [],
		},
	});
</script>

<template>
	<SidebarProvider>
		<Sidebar />
		<div class="layout">
			<Topbar :links="props.links" />
			<main class="p-8" :class="props.class">
				<slot />
			</main>
			<footer></footer>
		</div>
	</SidebarProvider>
	<Toaster />
	<div id="modal-root"></div>
</template>
