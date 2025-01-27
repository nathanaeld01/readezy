<script setup>
	import { PaginationList, PaginationRoot } from 'radix-vue';
	import PaginationEllipsis from './pagination-ellipsis.vue';
	import PaginationFirst from './pagination-first.vue';
	import PaginationItem from './pagination-item.vue';
	import PaginationLast from './pagination-last.vue';
	import PaginationNext from './pagination-next.vue';
	import PaginationPrev from './pagination-prev.vue';

	const props = defineProps({
		total: {
			type: Number,
			required: true,
		},
		defaultPage: {
			type: Number,
			required: false,
			default: 1,
		},
	});
</script>

<template>
	<PaginationRoot
		v-slot="{ page }"
		:total="props.total"
		:sibling-count="1"
		show-edges
		:default-page="props.defaultPage"
	>
		<PaginationList v-slot="{ items }" class="pagination">
			<PaginationFirst />
			<PaginationPrev />

			<template v-for="(item, index) in items">
				<PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value" :page="page">
					{{ item.value }}
				</PaginationItem>
				<PaginationEllipsis v-else :key="item.type" :index="index" />
			</template>

			<PaginationNext />
			<PaginationLast />
		</PaginationList>
	</PaginationRoot>
</template>

<style lang="postcss">
	.pagination {
		@apply flex gap-1;
	}
</style>
