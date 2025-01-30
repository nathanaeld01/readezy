<script setup>
	import { cn } from '@/lib/utils';
	import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
	import { computed } from 'vue';

	const props = defineProps({
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

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<CheckboxRoot
		v-bind="forwarded"
		:class="
			cn(
				'peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground size-4 shrink-0 rounded-xs border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
				props.class,
			)
		"
	>
		<CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
			<slot>
				<i class="ri-check-line" />
			</slot>
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
