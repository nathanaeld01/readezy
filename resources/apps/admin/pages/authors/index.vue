<script setup>
	import { Head } from '@inertiajs/vue3';
	import { ref, watch } from 'vue';

	import { CreateAuthorForm, SearchAuthorForm } from '@/admin/components/forms/author';
	import { AuthorsListTable } from '@/admin/components/tables';
	import { Button } from '@/admin/components/ui/button';
	import { Pagination } from '@/admin/components/ui/pagination';
	import { AppLayout } from '@/admin/layout';

	const props = defineProps({
		authors: { type: Object, required: true },
		searchTerm: { type: String, required: false },
		pagination: { type: Object, required: true },
	});

	const selectedAuthors = ref([]);

	watch(selectedAuthors, (value) => console.log(value));
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
				<SearchAuthorForm :value="props.searchTerm" class="max-w-75" />
				<div class="flex gap-2">
					<Button v-if="selectedAuthors.length" variant="danger">
						<i class="ri-delete-bin-line"></i>
						<span>Delete Author{{ selectedAuthors.length > 1 ? 's' : '' }}</span>
						<span
							class="flex size-5 items-center justify-center rounded-full bg-white/30 text-xs/none text-white"
						>
							{{ selectedAuthors.length }}
						</span>
					</Button>
					<CreateAuthorForm />
				</div>
			</div>
			<AuthorsListTable :data="props.authors" @update:row-selection="selectedAuthors = $event" />
			<div class="flex items-center justify-between">
				<Pagination :default-page="props.pagination.current_page" :total="props.pagination.total" />
			</div>
		</div>
	</AppLayout>
</template>
