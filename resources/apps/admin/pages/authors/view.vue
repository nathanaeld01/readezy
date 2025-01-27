<script setup>
	import { Head, usePage } from '@inertiajs/vue3';

	import { Card, CardContent, CardHeader, CardTitle } from '@/admin/components/ui/card';
	import { AppLayout } from '@/admin/layout';

	const { author } = usePage().props;
</script>

<template>
	<Head :title="`Author: ${author.title}`" />
	<AppLayout :links="[{ name: 'Authors', href: '/authors' }, { name: author.title }]">
		<div class="flex flex-col gap-8 container lg:flex-row">
			<Card class="aspect-book w-64 shrink-0 overflow-hidden">
				<img :src="author.image_url" alt="author.name" class="size-full object-cover" />
			</Card>
			<Card class="grow">
				<CardHeader>
					<CardTitle
						>Author: <span class="pl-2 font-normal italic">{{ author.title }}</span></CardTitle
					>
				</CardHeader>
				<CardContent class="p-4">
					<table>
						<tbody class="details">
							<tr v-if="author.dob" class="detail-item">
								<th class="detail-title">Date of Birth</th>
								<td>{{ author.dob }}</td>
							</tr>
							<tr v-if="author.dod" class="detail-item">
								<th class="detail-title">Date of Death</th>
								<td>{{ author.email }}</td>
							</tr>
							<tr class="detail-item">
								<th class="detail-title">Description</th>
								<td>
									<p v-for="(para, index) in author.description" :key="index">{{ para }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</CardContent>
			</Card>
		</div>
	</AppLayout>
</template>

<style lang="postcss">
	.details {
		@apply w-full divide-y divide-border;

		.detail-item {
			@apply w-full;

			& > * {
				@apply py-2;

				&:first-child {
					@apply pl-4;
				}

				&:last-child {
					@apply pr-4;
				}
			}

			&:first-of-type > * {
				@apply pt-0;
			}

			&:last-of-type > * {
				@apply pb-0;
			}
		}

		.detail-title {
			@apply min-w-48 text-left align-baseline font-semibold;
		}
	}
</style>
