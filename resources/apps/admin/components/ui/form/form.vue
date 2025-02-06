<script setup lang="ts">
	import { useForm } from 'vee-validate';

	import { useFormStates } from './use-form-valid';

	const { name, validationSchema } = defineProps({
		name: { type: String, required: true },
		validationSchema: { type: Object, required: false },
	});
	const emits = defineEmits(['submit', 'reset']);

	const { meta, handleSubmit, ...formProps } = useForm({
		name,
		validationSchema,
	});
	const { canReset, canSubmit } = useFormStates(meta);

	const onSubmit = handleSubmit((values) => {
		emits('submit', values);
	});
</script>

<template>
	<slot v-bind="{ onSubmit, canReset, canSubmit, ...formProps }" />
</template>
