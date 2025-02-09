<script>
	export default {
		name: "BookActions",
	};
</script>

<script setup>
	import { Button } from '../ui/button';
	import Loading from '../loading.vue';
	
	const props = defineProps({
		price: {
			type: String,
			required: false,
		},
		hasBookmark: {
			type: Boolean,
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
		<div class="flex justify-between" :class="props.class">
			<div class="flex items-center gap-5">
				<div class="w-fit">
					<Loading class="h-8 w-24" :isLoading>
						<span>₹</span> <span class="text-2xl">{{ price }}</span>
					</Loading>
				</div>
				<Button>
					<i class="ri-add-fill" />
					<span>Add to Cart</span>
				</Button>
			</div>
			<div class="flex gap-2.5">
				<Button variant="secondary" icon>
					<i :class="{ 'ri-bookmark-line': !hasBookmark, 'ri-bookmark-fill': hasBookmark }" />
				</Button>
				<Button variant="secondary" icon>
					<i class="ri-share-line" />
				</Button>
			</div>
		</div>
	</section>
</template>