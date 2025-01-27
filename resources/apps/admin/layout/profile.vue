<script setup lang="ts">
	import { cn } from '@/js/lib/utils';
	import { Link, usePage } from '@inertiajs/vue3';
	import { Card, CardContent, CardFooter } from '../components/ui/card';

	const { url, props } = usePage();
	const { name, avatar, email } = props.auth.user || {};

	const profileLinks = [
		{ name: 'Profile', link: '/profile', icon: 'ri-user-line' },
		{ name: 'Settings', link: '/profile/settings', icon: 'ri-settings-line' },
	];
</script>

<template>
	<div class="sticky top-8 h-fit space-y-4">
		<Card>
			<CardContent class="flex justify-center py-6">
				<div class="flex size-20 items-center justify-center overflow-hidden rounded-full bg-muted">
					<img v-if="avatar" :src="avatar" class="size-20 rounded-full" />
					<i v-else class="ri-user-line text-3xl text-foreground/60"></i>
				</div>
			</CardContent>
			<CardFooter class="flex-col items-center gap-2 py-4">
				<p class="text-base/none font-semibold">{{ name }}</p>
				<p class="text-sm/none text-foreground/70">{{ email }}</p>
			</CardFooter>
		</Card>
		<ul class="flex flex-col gap-1 overflow-hidden rounded-lg border border-border p-2">
			<li v-for="link in profileLinks" :key="link.name">
				<Link
					:class="
						cn(
							'flex h-8 w-full items-center gap-2.5 rounded-md px-2.5 hover:bg-accent/70',
							url === link.link ? 'bg-accent/70' : null,
						)
					"
					:href="link.link"
				>
					<i :class="link.icon"></i>
					<span>{{ link.name }}</span>
				</Link>
			</li>
		</ul>
	</div>
	<div class="space-y-6">
		<slot />
	</div>
</template>
