<script setup lang="ts">
	import { useForm } from 'vee-validate';

	import { useFormStates } from './use-form-valid';

	const { name } = defineProps({
		name: { type: String, required: true },
	});
	const emits = defineEmits(['submit', 'reset']);

	const { meta, handleSubmit, ...formProps } = useForm({
		name,
	});
	const { canReset, canSubmit } = useFormStates(meta);

	const onSubmit = handleSubmit((values) => {
		emits('submit', values);
	});
</script>

<template>
	<slot v-bind="{ onSubmit, canReset, canSubmit, ...formProps }" />
</template>
