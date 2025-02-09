<script setup>
	import { PaginationEllipsis } from 'radix-vue';
	import { computed } from 'vue';

	import { cn } from '@/js/lib/utils';

	const props = defineProps({
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});
</script>

<template>
	<PaginationEllipsis v-bind="delegatedProps" :class="cn('flex h-9 w-9 items-center justify-center', props.class)">
		<slot>
			<i class="ri-more-fill text-lg" />
		</slot>
	</PaginationEllipsis>
</template>
