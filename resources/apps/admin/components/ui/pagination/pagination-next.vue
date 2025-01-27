<script setup>
	import { PaginationNext } from 'radix-vue';
	import { computed } from 'vue';

	import { Button } from '../../ui/button';

	const props = defineProps({
		asChild: { type: Boolean, required: false, default: true },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});
</script>

<template>
	<PaginationNext v-bind="delegatedProps">
		<Button icon variant="ghost">
			<slot>
				<i class="ri-arrow-right-s-line text-xl" />
			</slot>
		</Button>
	</PaginationNext>
</template>
