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

<style lang="postcss">
	.form-textarea {
		@apply rounded-md border border-border bg-input px-3 py-1.5;

		&:focus {
			@apply border-border outline outline-2 outline-offset-2 outline-ring ring-0;
		}
	}
</style>
