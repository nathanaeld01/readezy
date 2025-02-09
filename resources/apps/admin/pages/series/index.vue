<script setup>
	import { Head, Link, usePage } from '@inertiajs/vue3';

	import { CreateSeriesForm } from '@/admin/components/forms/series';
	import { Button } from '@/admin/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/admin/components/ui/card';
	import { Input } from '@/admin/components/ui/input';
	import { Pagination } from '@/admin/components/ui/pagination';
	import { Table, TableBody, TableCell, TableHead, TableRow, TableTitle } from '@/admin/components/ui/table';
	import { AppLayout } from '@/admin/layout';

	const { current_page, last_page, data } = usePage().props.series;
</script>

<template>
	<Head title="View Series" />
	<AppLayout :links="[{ name: 'Series' }]">
		<Card>
			<CardHeader class="grid grid-cols-[1fr_25%] items-center">
				<CardTitle>View Series</CardTitle>
				<Input placeholder="Search for series by name" />
			</CardHeader>
			<CardContent>
				<Table>
					<TableHead>
						<TableRow>
							<TableTitle class="w-16">S.No.</TableTitle>
							<TableTitle align="left">Title</TableTitle>
							<TableTitle class="w-24">Books</TableTitle>
							<TableTitle class="w-48">Author</TableTitle>
							<TableTitle class="w-32">Actions</TableTitle>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow v-for="(series, index) in data" :key="series.slug">
							<TableCell>{{ index + 1 }}</TableCell>
							<TableCell align="left">
								<Link :href="`/series/${series.slug}`">
									{{ series.title }}
								</Link>
							</TableCell>
							<TableCell>{{ series.books_count }}</TableCell>
							<TableCell>{{ series.author.title }}</TableCell>
							<TableCell class="space-x-2">
								<Link :href="`/series/${series.slug}/edit`" class="btn btn-secondary">
									<i class="ri-pencil-line" />
								</Link>
								<Button variant="danger" icon>
									<i class="ri-delete-bin-line" />
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter class="items-center justify-between">
				<Pagination :default-page="current_page" :total="last_page" />
				<CreateSeriesForm />
			</CardFooter>
		</Card>
	</AppLayout>
</template>
