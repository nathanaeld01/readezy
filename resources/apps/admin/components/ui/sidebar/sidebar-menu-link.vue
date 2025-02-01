<script setup>
	import { cn } from '@/js/lib/utils';
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
	<Link
		:href="href"
		:class="
			cn(
				'flex h-8 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm leading-none text-foreground transition-[background,color] duration-200 select-none hover:bg-accent hover:text-accent-foreground',
				$page.url.startsWith(href) && 'bg-accent font-medium text-accent-foreground',
			)
		"
	>
		<i :class="`ri-${icon} text-lg`" />
		<slot />
	</Link>
</template>
