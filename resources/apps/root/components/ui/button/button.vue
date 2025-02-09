<script setup>
	import { buttonVariants } from '.';

	const { variant, size, icon, ...props } = defineProps({
		variant: {
			type: String,
			default: 'primary',
			validator: (value) => ['primary', 'secondary', 'ghost', 'danger'].includes(value)
		},
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['sm', 'md', 'lg'].includes(value)
		},
		icon: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'button',
			validator: (value) => ['button', 'submit', 'reset'].includes(value)
		},
		class: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['click']);
</script>

<template>
	<button :class="buttonVariants({ variant, size, icon })" v-bind="props" @click="emit('click')">
		<slot />
	</button>
</template>

<style lang="postcss">
	.btn {
		@apply flex h-10 items-center justify-center rounded-full gap-2.5 px-6 py-2.5 text-sm transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50;

		&.btn-primary {
			@apply bg-alabaster-950 text-white hover:bg-alabaster-950/80;
		}

		&.btn-secondary {
			@apply bg-alabaster-200 text-black hover:bg-alabaster-200/80;
		}

		&.btn-ghost {
			@apply bg-transparent text-alabaster-950 hover:bg-alabaster-950/10;
		}

		&.btn-large {
			@apply h-11 px-8 py-3 text-base;
		}

		&.btn-icon {
			@apply w-10 px-1 py-1 text-xl;

			&.btn-large {
				@apply w-11;
			}
		}
	}
</style>