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
	<Breadcrumb>
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
