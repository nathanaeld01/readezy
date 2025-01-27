<script setup>
	import { buttonVariants } from '.';

	const { variant, size, icon, ...props } = defineProps({
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
	<button :class="buttonVariants({ variant, size, icon })" v-bind="props" @click="emit('click')">
		<slot />
	</button>
</template>

<style lang="postcss">
	.btn {
		@apply inline-flex h-9 items-center justify-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium leading-none transition-[background,color,border] duration-200 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-60;

		&.btn-primary {
			@apply bg-primary text-primary-foreground hover:bg-primary/80 disabled:hover:bg-primary;
		}

		&.btn-secondary {
			@apply bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:hover:bg-secondary;
		}

		&.btn-tertiary {
			@apply border border-accent bg-muted text-muted-foreground hover:bg-muted/80 disabled:hover:bg-muted;
		}

		&.btn-ghost {
			@apply bg-transparent text-foreground hover:bg-accent/80 disabled:hover:bg-transparent;
		}

		&.btn-danger {
			@apply bg-destructive text-destructive-foreground hover:bg-destructive/80 disabled:hover:bg-destructive;
		}

		&.btn-small {
			@apply h-8 px-2.5 py-1;
		}

		&.btn-large {
			@apply h-10 px-4 py-2.5;
		}

		&.btn-icon {
			@apply w-9 p-0 text-lg;

			&.btn-small {
				@apply w-8;
			}

			&.btn-large {
				@apply w-10;
			}
		}

		&.btn-full {
			@apply w-full;
		}
	}
</style>
