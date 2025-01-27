import { type FormMeta } from 'vee-validate';
import { computed, type ComputedRef } from 'vue';

export const useFormStates = <T>(meta: ComputedRef<FormMeta<T>>) => {
	const canReset = computed(() => meta.value.dirty);
	const canSubmit = computed(() => meta.value.valid && meta.value.dirty);

	return {
		canReset,
		canSubmit,
	};
};
