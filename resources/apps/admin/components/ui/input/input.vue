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

<style lang="postcss">
	.form-input {
		@apply flex h-9 w-full rounded-md border border-border bg-input px-3 py-1.5 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50;

		&.input-hidden {
			@apply hidden;
		}

		&:focus {
			@apply border-border outline outline-2 outline-offset-2 outline-ring ring-0;
		}

		&[type='file'] {
			@apply cursor-pointer;

			&::file-selector-button {
				@apply -ml-3 -mt-1.5 me-4 h-9 cursor-pointer border-0 border-e border-solid border-border bg-background px-4 py-1.5 text-foreground;
			}

			&:hover::file-selector-button {
				@apply bg-background/80;
			}
		}
	}
</style>
