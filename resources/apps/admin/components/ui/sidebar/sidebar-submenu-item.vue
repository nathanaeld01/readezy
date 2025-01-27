<script setup>
	import { Link } from "@inertiajs/vue3";

	defineProps({
		href: {
			type: String,
			required: true,
		},
	});
</script>

<template>
	<li class="sidebar-submenu-item">
		<Link
			class="sidebar-submenu-link"
			:class="{ active: $page.url.split('?')[0] === href }"
			:href="href"
		>
			<slot />
		</Link>
	</li>
</template>
