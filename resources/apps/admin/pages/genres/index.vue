<script setup>
	import { Head, Link, usePage } from '@inertiajs/vue3';

	import CreateGenre from '@/admin/components/forms/create-genre.vue';
	import { Button } from '@/admin/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/admin/components/ui/card';
	import { Table, TableBody, TableCell, TableHead, TableRow, TableTitle } from '@/admin/components/ui/table';
	import { AppLayout } from '@/admin/layout';

	const { genres } = usePage().props;
</script>

<template>
	<Head title="View Genres" />
	<AppLayout>
		<Card>
			<CardHeader class="grid auto-cols-auto items-center">
				<CardTitle>View Genres</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHead>
						<TableRow>
							<TableTitle class="w-20">S.No.</TableTitle>
							<TableTitle align="left">Title</TableTitle>
							<TableTitle class="w-20">Books</TableTitle>
							<TableTitle class="w-48">Actions</TableTitle>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow v-for="(genre, index) in genres" :key="genre.slug">
							<TableCell>{{ index + 1 }}</TableCell>
							<TableCell align="left">{{ genre.title }}</TableCell>
							<TableCell>{{ genre.books_count }}</TableCell>
							<TableCell class="space-x-2">
								<Link :href="`/genres/${genre.slug}/edit`" class="btn btn-secondary btn-icon">
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
			<CardFooter class="justify-end">
				<CreateGenre />
			</CardFooter>
		</Card>
	</AppLayout>
</template>
