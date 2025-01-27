<script setup>
	import TableCell from "./table-cell.vue";
	import TableRow from "./table-row.vue";

	const props = defineProps({
		colspan: {
			type: Number,
			required: false,
			default: 1,
		},
	});
</script>

<template>
	<TableRow>
		<TableCell v-bind="props">
			<slot />
		</TableCell>
	</TableRow>
</template>
