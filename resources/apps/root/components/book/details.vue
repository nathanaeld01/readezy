<script>
	export default {
		name: "BookDetails",
	};
</script>

<script setup>
	import { Link } from '@inertiajs/vue3';
	import DetailItem from '../detail-item.vue';

	import { formatDate } from '@/js/lib/utils';

	const { data, isLoading } = defineProps({
		data: {
			type: Object,
			required: false,
		},
		isLoading: {
			type: Boolean,
			default: true,
		},
	});
</script>

<template>
	<section>
		<DetailItem title="Description" :loadingNumber="5" :isLoading="isLoading">
			<p v-for="para in data?.book.description">{{ para }}</p>
		</DetailItem>
		<div class="mt-8 flex flex-col">
			<div class="detail-row">
				<DetailItem class="pr-2.5" title="Language" :isLoading>
					<span>{{ data?.book.language }}</span>
				</DetailItem>
				<DetailItem class="pl-2.5" title="Genre" :isLoading>
					<Link :href="`/genre/${data?.genre.slug}`">{{ data?.genre.title }}</Link>
				</DetailItem>
			</div>
			<div class="detail-row">
				<DetailItem class="pr-2.5" title="Publisher" :isLoading>
					<span>{{ data?.book.publisher }}</span>
				</DetailItem>
				<DetailItem class="pl-2.5" title="Published On" :isLoading>
					<span>{{ formatDate(data?.book.published_at, 'd MMMM, yyyy') }}</span>
				</DetailItem>
			</div>
			<div class="detail-row">
				<DetailItem class="pr-2.5" title="ISBN" :isLoading>
					<span>{{ data?.book.isbn }}</span>
				</DetailItem>
				<DetailItem class="pl-2.5" title="Pages" :isLoading>
					<span>{{ data?.book.pages }}</span>
				</DetailItem>
			</div>
		</div>
	</section>
</template>