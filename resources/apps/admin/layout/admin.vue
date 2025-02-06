<script setup>
	import { Toaster } from '@/admin/components/ui/sonner';
	import { cn } from '@/js/lib/utils';
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
			<main :class="cn('container mx-auto p-8', props.class)">
				<slot />
			</main>
			<footer></footer>
		</div>
	</SidebarProvider>
	<Toaster />
	<div id="modal-root"></div>
</template>
