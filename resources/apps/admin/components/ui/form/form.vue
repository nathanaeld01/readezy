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

<style lang="postcss">
	.form {
		@apply grid gap-4;

		.form-item {
			@apply flex flex-col gap-2;
		}
	}

	.form-item {
		@apply flex flex-col gap-2.5;

		.form-label {
			@apply text-sm/none text-foreground;
		}

		&.form-error {
			.form-label {
				@apply text-destructive;
			}

			.form-input,
			.form-textarea {
				@apply border-destructive;
			}
		}
	}
</style>
