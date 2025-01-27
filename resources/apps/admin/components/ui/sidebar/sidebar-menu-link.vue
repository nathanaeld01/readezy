<script setup>
	import { Link } from '@inertiajs/vue3';

	const { href, icon } = defineProps({
		href: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
	});
</script>

<template>
	<Link :href="href" class="sidebar-menu-link" :class="{ active: $page.url.split('?')[0] === href }">
		<i :class="`ri-${icon} text-lg`" />
		<slot />
	</Link>
</template>
