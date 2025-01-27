<script setup>
	import { Head, Link, usePage } from '@inertiajs/vue3';

	import { CreateAuthorForm, DeleteAuthorForm, SearchAuthorForm } from '@/admin/components/forms/author';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/admin/components/ui/card';
	import { Pagination } from '@/admin/components/ui/pagination';
	import { Table, TableBody, TableCell, TableHead, TableRow, TableTitle } from '@/admin/components/ui/table';
	import { AppLayout } from '@/admin/layout';

	const { current_page, last_page, data } = usePage().props.authors;
</script>

<template>
	<Head title="View Authors" />
	<AppLayout :links="[{ name: 'Authors' }]">
		<Card>
			<CardHeader class="grid grid-cols-[1fr_25%] items-center">
				<CardTitle>View Authors</CardTitle>
				<SearchAuthorForm />
			</CardHeader>
			<CardContent class="authors-list">
				<Table>
					<TableHead>
						<TableRow>
							<TableTitle class="w-16">S.No.</TableTitle>
							<TableTitle class="w-28">Image</TableTitle>
							<TableTitle align="left">Name</TableTitle>
							<TableTitle class="w-24">Books</TableTitle>
							<TableTitle class="w-24">Series</TableTitle>
							<TableTitle class="w-40">Actions</TableTitle>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow v-for="(author, index) in data" :key="author.slug">
							<TableCell>{{ index + 1 }}</TableCell>
							<TableCell>
								<img :src="author.image_url" alt="Author Image" class="mx-auto size-10 rounded-full" />
							</TableCell>
							<TableCell align="left">
								<Link
									:href="`/authors/${author.slug}`"
									class="underline underline-offset-4"
									:title="author.title"
								>
									{{ author.title }}
								</Link>
							</TableCell>
							<TableCell>{{ author.books_count }}</TableCell>
							<TableCell>{{ author.series_count }}</TableCell>
							<TableCell class="space-x-2">
								<Link
									:href="`/authors/${author.slug}/edit`"
									class="btn btn-secondary btn-icon"
									title="Edit Author"
								>
									<i class="ri-pencil-line" />
								</Link>
								<DeleteAuthorForm :slug="author.slug" />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter class="items-center justify-between">
				<Pagination :default-page="current_page" :total="last_page" />
				<CreateAuthorForm />
			</CardFooter>
		</Card>
	</AppLayout>
</template>

<style lang="postcss">
	.authors-list {
		.author-title-center {
			@apply text-center;
		}
	}
</style>
