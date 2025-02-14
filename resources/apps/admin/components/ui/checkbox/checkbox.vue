<script setup>
	import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';

	import { cn } from '@/js/lib/utils';

	const { class: classProps, ...props } = defineProps({
		defaultChecked: { type: Boolean, required: false },
		checked: { type: [Boolean, String], required: false },
		disabled: { type: Boolean, required: false },
		required: { type: Boolean, required: false },
		name: { type: String, required: false },
		value: { type: String, required: false },
		id: { type: String, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});
	const emits = defineEmits(['update:checked']);

	const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<CheckboxRoot v-bind="forwarded" :class="cn('form-checkbox', classProps)">
		<CheckboxIndicator class="flex size-full items-center justify-center text-current">
			<i class="ri-check-line text-foreground"></i>
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
