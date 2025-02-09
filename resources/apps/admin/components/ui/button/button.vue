<script setup>
	import { cn } from '@/js/lib/utils';
	import { buttonVariants } from '.';

	const {
		variant,
		size,
		icon,
		class: classProp,
		...props
	} = defineProps({
		variant: {
			type: String,
			default: 'primary',
			validator: (value) => ['primary', 'secondary', 'tertiary', 'ghost', 'danger'].includes(value),
		},
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['sm', 'md', 'lg'].includes(value),
		},
		icon: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'button',
			validator: (value) => ['button', 'submit', 'reset'].includes(value),
		},
		class: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['click']);
</script>

<template>
	<button :class="cn(buttonVariants({ variant, size, icon }), classProp)" v-bind="props" @click="emit('click')">
		<slot />
	</button>
</template>
