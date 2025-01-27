<script setup>
	import Breadcrumb from './Breadcrumb.vue';
	import BreadcrumbItem from './BreadcrumbItem.vue';
	import BreadcrumbLink from './BreadcrumbLink.vue';
	import BreadcrumbList from './BreadcrumbList.vue';
	import BreadcrumbPage from './BreadcrumbPage.vue';
	import BreadcrumbSeparator from './BreadcrumbSeparator.vue';

	defineProps({
		links: {
			type: Array,
			default: () => [],
		},
	});
</script>

<template>
	<Breadcrumb class="breadcrumb">
		<BreadcrumbList>
			<template v-if="links.length">
				<template v-for="(link, index) in links" :key="index">
					<BreadcrumbItem>
						<BreadcrumbLink v-if="index < links.length - 1" :href="link.href">
							{{ link.name }}
						</BreadcrumbLink>
						<BreadcrumbPage v-else>{{ link.name }}</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator v-if="index < links.length - 1" />
				</template>
			</template>
		</BreadcrumbList>
	</Breadcrumb>
</template>

<style lang="postcss">
	.breadcrumb {
		.breadcrumb-list {
			@apply flex flex-wrap items-center gap-1 break-words text-sm text-muted-foreground;
		}
	}

	.breadcrumb-list {
		.breadcrumb-item {
			@apply inline-flex items-center gap-1.5;
		}

		.breadcrumb-separator {
			@apply text-lg leading-none;
		}

		.breadcrumb-page {
			@apply inline-flex h-9 items-center justify-center px-3 py-1.5 text-sm font-normal text-foreground;
		}
	}
</style>
