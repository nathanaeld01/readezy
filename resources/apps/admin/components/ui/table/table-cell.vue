<script setup>
	import { computed } from 'vue';
	import clsx from 'clsx';

	const props = defineProps({
		class: {
			type: String,
			default: ''
		},
		align: {
			type: String,
			default: 'center',
			validator: (value) => {
				return ['left', 'center', 'right'].includes(value);
			}
		},
	});

	const align = ({
		left: 'table-left',
		right: 'table-right',
	})[props.align];

	const classes = clsx(align, props.class);
</script>

<template>
	<td class="table-data" :class="classes">
		<slot />
	</td>
</template>
