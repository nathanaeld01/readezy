<script setup>
	import { cn } from '@/js/lib/utils';
	import { useVModel } from '@vueuse/core';
	import { computed } from 'vue';

	const {
		modelValue: mV,
		defaultValue,
		icon,
		class: classes,
		...props
	} = defineProps({
		defaultValue: { type: [String, Number], required: false },
		modelValue: { type: [String, Number], required: false },
		type: { type: String, default: 'text', required: false },
		class: { type: String, required: false },
		icon: { type: [String, null], required: false },
		placeholder: { type: String, required: false },
	});
	const emits = defineEmits(['update:modelValue']);

	const modelProps = computed(() => ({ modelValue: mV, defaultValue }));
	const modelValue = useVModel(modelProps, 'modelValue', emits, {
		passive: true,
		defaultValue: defaultValue,
	});

	const onChange = (e) => {
		const value = props.type === 'file' ? e.target.files : e.target.value;
		emits('update:modelValue', value);
	};

	const inputClass = cn(
		'flex h-9 w-full rounded-md border border-border bg-input px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:border-border focus:ring-0 focus:outline-2 focus:outline-offset-2 focus:outline-ring disabled:cursor-not-allowed disabled:opacity-50',
		icon && 'pl-10',
	);
</script>

<template>
	<div :class="cn('relative w-full items-center', classes)">
		<input v-model="modelValue" v-bind="props" :class="inputClass" @change="onChange" />
		<span v-if="icon" class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center px-3">
			<i class="text-lg" :class="icon" />
		</span>
	</div>
</template>
