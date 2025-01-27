<script setup>
	import SidebarMenuLink from './sidebar-menu-link.vue';

	const props = defineProps({
		href: {
			type: String,
			default: '/',
		},
		icon: {
			type: String,
			default: '',
		},
	});
</script>

<template>
	<li class="sidebar-menu-item">
		<SidebarMenuLink v-bind="props">
			<slot />
		</SidebarMenuLink>
	</li>
</template>
