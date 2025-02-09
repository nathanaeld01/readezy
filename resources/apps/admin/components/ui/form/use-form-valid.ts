import { type FormMeta } from 'vee-validate';
import { computed, Ref, type ComputedRef } from 'vue';

export const useFormStates = <T>(meta: ComputedRef<FormMeta<T>>, isSubmitting: Ref<boolean>) => {
	const isResettable = computed(() => meta.value.dirty && !isSubmitting.value);
	const isSubmittable = computed(() => meta.value.valid && meta.value.dirty && !isSubmitting.value);

	return {
		isResettable,
		isSubmittable,
	};
};
