<script setup>
	import { Head, Link, usePage } from '@inertiajs/vue3';

	import CreateBook from '@/admin/components/forms/create-book.vue';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/admin/components/ui/card';
	import { Pagination } from '@/admin/components/ui/pagination';
	import { Table, TableBody, TableCell, TableHead, TableRow, TableTitle } from '@/admin/components/ui/table';
	import { AppLayout } from '@/admin/layout';

	const { current_page, last_page, data } = usePage().props.books;
</script>

<template>
	<Head title="View Books" />
	<AppLayout :links="[{ name: 'Books' }]">
		<Card>
			<CardHeader>
				<CardTitle>View Books</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHead>
						<TableRow>
							<TableTitle class="w-16">S.No.</TableTitle>
							<TableTitle align="left">Title</TableTitle>
							<TableTitle class="w-40">Author</TableTitle>
							<TableTitle class="w-40">Series</TableTitle>
							<TableTitle class="w-24">Genre</TableTitle>
							<TableTitle class="w-12">Actions</TableTitle>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow v-for="(book, index) in data" :key="index">
							<TableCell>{{ index + 1 }}</TableCell>
							<TableCell align="left">
								{{ book.title }}
							</TableCell>
							<TableCell>
								<Link
									:href="`/authors/${book.author.slug}`"
									class="underline underline-offset-4"
									:title="book.author.title"
								>
									{{ book.author.title }}
								</Link>
							</TableCell>
							<TableCell>
								<Link
									:href="`/series/${book.series.slug}`"
									class="underline underline-offset-4"
									:title="book.series.title"
								>
									{{ book.series.title }}
								</Link>
							</TableCell>
							<TableCell>{{ book.genre.title }}</TableCell>
							<TableCell class="space-x-2">
								<Link
									:href="`/books/${book.slug}/edit`"
									class="btn btn-secondary btn-icon"
									title="Edit Book"
								>
									<i class="ri-pencil-line" />
								</Link>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter class="justify-between">
				<Pagination :default-page="current_page" :total="last_page" />
				<CreateBook />
			</CardFooter>
		</Card>
	</AppLayout>
</template>
