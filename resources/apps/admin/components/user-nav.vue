<script setup>
	import { usePage } from '@inertiajs/vue3';
	import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from './ui/sidebar';

	const { name, email, avatar } = usePage().props?.auth.user || {};
</script>

<template>
	<SidebarGroup>
		<SidebarGroupContent>
			<div class="flex gap-2 rounded-lg border border-border p-2">
				<div class="flex size-10 items-center justify-center overflow-hidden rounded-full bg-muted">
					<img v-if="avatar" :src="avatar" class="size-10" />
					<i v-else class="ri-user-line text-foreground/60"></i>
				</div>
				<div class="flex flex-col">
					<span class="text-sm font-semibold">{{ name }}</span>
					<span class="text-sm text-foreground/80">{{ email }}</span>
				</div>
			</div>
			<SidebarMenu>
				<SidebarMenuItem href="/profile" icon="user-line">
					<span>Profile</span>
				</SidebarMenuItem>
				<SidebarMenuItem href="/logout" icon="logout-box-r-line">
					<span>Log Out</span>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroupContent>
	</SidebarGroup>
</template>
