<script setup>
	import { PaginationListItem } from 'radix-vue';
	import { Button } from '../../ui/button';

	const props = defineProps({
		value: {
			type: Number,
			required: true,
		},
		page: {
			type: Number,
			required: true,
		},
	});
</script>

<template>
	<PaginationListItem :value="props.value" as-child>
		<Button variant="tertiary" :class="{ 'opacity-50': props.value === props.page }" icon>
			<slot />
		</Button>
	</PaginationListItem>
</template>
