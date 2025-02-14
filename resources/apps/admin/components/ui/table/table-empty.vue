<script setup>
	import { cn } from '@/lib/utils';
	import { computed } from 'vue';
	import TableCell from './table-cell.vue';
	import TableRow from './table-row.vue';

	const props = defineProps({
		class: { type: null, required: false },
		colspan: { type: Number, required: false, default: 1 },
	});

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});
</script>

<template>
	<TableRow class="hover:bg-transparent">
		<TableCell
			:class="cn('p-4 align-middle text-sm whitespace-nowrap text-foreground', props.class)"
			v-bind="delegatedProps"
		>
			<div class="flex items-center justify-center py-8">
				<slot />
			</div>
		</TableCell>
	</TableRow>
</template>
