<script setup>
	import { useVModel } from '@vueuse/core';

	const {
		class: classes,
		type,
		...props
	} = defineProps({
		defaultValue: { type: [String, Number], required: false },
		modelValue: { type: [String, Number], required: false },
		type: { type: String, required: false },
		class: { type: String, required: false },
	});
	const emits = defineEmits(['update:modelValue']);

	const modelValue = useVModel(props, 'modelValue', emits, {
		passive: true,
		defaultValue: props.defaultValue,
	});

	const onChange = (e) => {
		const value = type === 'file' ? e.target.files : e.target.value;
		emits('update:modelValue', value);
	};
</script>

<template>
	<input v-model="modelValue" :type class="form-input" :class="classes" @change="onChange" />
</template>
