<script setup>
	import { cn } from '@/js/lib/utils';
	import { Link } from '@inertiajs/vue3';

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
			:class="
				cn(
					'flex h-8 items-center rounded-md px-2.5 py-2 text-sm text-foreground transition-[background,color] duration-200 select-none hover:bg-accent/60 hover:text-accent-foreground',
					$page.url.startsWith(href) && 'bg-accent/60 font-medium text-accent-foreground',
				)
			"
			:href="href"
		>
			<slot />
		</Link>
	</li>
</template>
