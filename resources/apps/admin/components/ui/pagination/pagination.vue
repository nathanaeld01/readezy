<script setup>
	import { PaginationList, PaginationRoot } from 'radix-vue';
	import { computed } from 'vue';

	import PaginationEllipsis from './pagination-ellipsis.vue';
	import PaginationItem from './pagination-item.vue';
	import PaginationNext from './pagination-next.vue';
	import PaginationPrev from './pagination-prev.vue';

	const {
		currentPage: defaultPage,
		perPage: itemsPerPage,
		total,
	} = defineProps({
		total: {
			type: Number,
			required: false,
		},
		perPage: {
			type: Number,
			required: false,
			default: 5,
		},
		currentPage: {
			type: Number,
			required: false,
			default: 1,
		},
	});

	const emits = defineEmits(['update:page']);

	const props = computed(() => ({ defaultPage, itemsPerPage, total }));
</script>

<template>
	<PaginationRoot
		v-slot="{ page: p }"
		v-bind="props"
		:sibling-count="1"
		show-edges
		@update:page="emits('update:page', $event)"
	>
		<PaginationList v-slot="{ items }" class="pagination">
			<PaginationPrev />

			<template v-for="(item, index) in items">
				<PaginationItem v-if="item.type === 'page'" :key="index" :value="item.value" :page="p">
					{{ item.value }}
				</PaginationItem>
				<PaginationEllipsis v-else :key="item.type" :index="index" />
			</template>

			<PaginationNext />
		</PaginationList>
	</PaginationRoot>
</template>
