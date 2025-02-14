<script setup>
	import { Head, router } from '@inertiajs/vue3';
	import { inject, ref } from 'vue';

	import { CreateAuthorForm, DeleteAuthorForm, SearchAuthorForm } from '@/admin/components/forms/author';
	import { AuthorsListTable } from '@/admin/components/tables';
	import { Pagination } from '@/admin/components/ui/pagination';
	import { AppLayout } from '@/admin/layout';

	const { authors, pagination, searchTerm } = defineProps({
		authors: { type: Object, required: true },
		searchTerm: { type: String, required: false },
		pagination: {
			type: Object,
			required: true,
			default: () => ({
				current_page: 1,
				total: 0,
				per_page: 5,
			}),
		},
	});

	const route = inject('route');
	const selectedAuthors = ref([]);

	const onPaginate = (index) => router.get('/authors', { ...route().params, page: index });
</script>

<template>
	<Head title="View Authors" />
	<AppLayout class="space-y-8" :links="[{ name: 'Authors' }]">
		<div class="flex flex-col gap-2">
			<h2 class="flex-1 text-2xl/none font-semibold">Authors</h2>
			<p class="text-sm/none text-foreground/70">View and manage authors</p>
		</div>
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<SearchAuthorForm :value="searchTerm" class="max-w-75" />
				<div class="flex gap-2">
					<DeleteAuthorForm v-if="selectedAuthors.length" :values="selectedAuthors" />
					<CreateAuthorForm />
				</div>
			</div>
			<AuthorsListTable :data="authors" @update:row-selection="selectedAuthors = $event" />
			<div class="flex items-center justify-between">
				<Pagination
					:total="pagination.total"
					:current-page="pagination.current_page"
					:per-page="pagination.per_page"
					@update:page="onPaginate"
				/>
			</div>
		</div>
	</AppLayout>
</template>
