<script setup lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupTitle,
		SidebarMenu,
		SidebarMenuItem,
	} from '../components/ui/sidebar';
	import UserNav from '../components/user-nav.vue';

	const sections = [
		{
			name: 'Resources',
			links: [
				{ name: 'Books', icon: 'book-line', href: '/books' },
				{ name: 'Series', icon: 'book-shelf-line', href: '/series' },
				{ name: 'Authors', icon: 'quill-pen-line', href: '/authors' },
				{ name: 'Genres', icon: 'hashtag', href: '/genres' },
			],
		},
	];
</script>

<template>
	<Sidebar>
		<template #default>
			<SidebarMenu class="px-2">
				<SidebarMenuItem href="/dashboard" icon="dashboard-line">Dashboard</SidebarMenuItem>
			</SidebarMenu>
			<SidebarGroup v-for="section in sections" :key="section.name">
				<SidebarGroupTitle>{{ section.name }}</SidebarGroupTitle>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem v-for="link in section.links" :key="link.name" v-bind="link">
							{{ link.name }}
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</template>
		<template #footer>
			<UserNav />
		</template>
	</Sidebar>
</template>
