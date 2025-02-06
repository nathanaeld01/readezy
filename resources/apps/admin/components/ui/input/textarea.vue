<script setup>
	import { useVModel } from '@vueuse/core';

	const props = defineProps({
		rows: {
			type: Number,
			default: 3,
		},
	});

	const emits = defineEmits(['update:modelValue']);

	const modelValue = useVModel(props, 'modelValue', emits, {
		passive: true,
		defaultValue: props.defaultValue,
	});
</script>

<template>
	<textarea v-model="modelValue" class="form-textarea" v-bind="props" />
</template>
