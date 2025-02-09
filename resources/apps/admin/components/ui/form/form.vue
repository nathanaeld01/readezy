<script setup>
	import { useForm } from 'vee-validate';

	import { useFormStates } from './use-form-valid';

	const props = defineProps({
		name: { type: String, required: true },
		validationSchema: { type: Object, required: true },
		initialValues: { type: Object, required: true },
	});

	const { handleSubmit, ...form } = useForm({
		name: props.name,
		validationSchema: props.validationSchema,
		initialValues: props.initialValues,
	});

	const handleScopedSlotSubmit = (evt, onSubmit) => {
		const onSuccess = typeof evt === 'function' && !onSubmit ? evt : onSubmit;
		return handleSubmit(onSuccess, props.onInvalidSubmit)(evt);
	};

	const { isResettable, isSubmittable } = useFormStates(form.meta, form.isSubmitting);
</script>

<template>
	<slot
		v-bind="{
			...form,
			handleSubmit: handleScopedSlotSubmit,
			isResettable,
			isSubmittable,
		}"
	/>
</template>
