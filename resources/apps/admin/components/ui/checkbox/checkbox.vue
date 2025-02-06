<script setup>
	import { useVModel } from '@vueuse/core';
	import { computed } from 'vue';

	const { defaultChecked, ...props } = defineProps({
		defaultChecked: { type: Boolean, required: false },
		checked: { type: [Boolean, String], required: false },
		disabled: { type: Boolean, required: false },
		required: { type: Boolean, required: false },
		name: { type: String, required: false },
		value: { type: String, required: false },
		id: { type: String, required: false },
		class: { type: null, required: false },
	});
	const emits = defineEmits(['update:checked']);

	const modelProps = computed(() => ({ defaultChecked, checked: props.checked }));
	const model = useVModel(modelProps, 'checked', emits, {
		passive: true,
		defaultValue: props.defaultChecked,
	});
</script>

<template>
	<input v-model="model" v-bind="props" type="checkbox" class="form-checkbox" />
</template>
