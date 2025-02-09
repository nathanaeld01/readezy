<script setup>
	import { Toaster as Sonner } from 'vue-sonner';
	import { ErrorIcon, InfoIcon, LoadingIcon, SuccessIcon, WarningIcon } from './icons';

	const props = defineProps({
		invert: { type: Boolean, required: false },
		theme: { type: String, required: false },
		position: { type: String, required: false },
		hotkey: { type: Array, required: false },
		richColors: { type: Boolean, required: false },
		expand: { type: Boolean, required: false },
		duration: { type: Number, required: false },
		gap: { type: Number, required: false },
		visibleToasts: { type: Number, required: false },
		closeButton: { type: Boolean, required: false },
		toastOptions: { type: Object, required: false },
		class: { type: String, required: false },
		style: { type: Object, required: false },
		offset: { type: [String, Number], required: false },
		dir: { type: String, required: false },
		icons: { type: Object, required: false },
		containerAriaLabel: { type: String, required: false },
		pauseWhenPageIsHidden: { type: Boolean, required: false },
		cn: { type: Function, required: false },
	});
</script>

<template>
	<Sonner
		v-bind="props"
		:toast-options="{
			class: 'toast',
			classes: {
				icon: 'toast-icon',
				content: 'toast-content',
				title: 'toast-title',
			},
		}"
	>
		<template #loading-icon>
			<LoadingIcon />
		</template>
		<template #success-icon>
			<SuccessIcon />
		</template>
		<template #error-icon>
			<ErrorIcon />
		</template>
		<template #info-icon>
			<InfoIcon />
		</template>
		<template #warning-icon>
			<WarningIcon />
		</template>
	</Sonner>
</template>

<style lang="postcss">
	.toast {
		@apply flex w-[var(--width)] items-center gap-4 overflow-hidden rounded-md border border-border bg-popover p-4 text-xs text-popover-foreground shadow-md;

		&-icon {
			@apply mx-0 size-fit justify-center rounded-full border-4 border-popover-foreground/15;
		}

		&-content {
			@apply gap-1.5;
		}

		&-title {
			@apply text-sm leading-none;
		}

		.icon {
			&-loading,
			&-success,
			&-info,
			&-warning,
			&-error {
				@apply size-5 rounded-full;
			}

			&-success,
			&-info,
			&-warning,
			&-error {
				@apply shadow-[0_0_65px_50px];
			}

			&-loading {
				@apply hidden fill-popover-foreground;
			}

			&-success {
				@apply fill-success shadow-success/10;
			}
			&-info {
				@apply fill-info shadow-info/10;
			}
			&-warning {
				@apply fill-warning shadow-warning/10;
			}
			&-error {
				@apply fill-error shadow-error/10;
			}
		}

		&[data-type='loading'] {
			.toast-icon {
				@apply animate-spin border-transparent;
			}

			.icon-loading {
				@apply block;
			}
		}

		&[data-type='error'] {
			.toast-title,
			.toast-icon {
				@apply text-error;
			}
		}

		&[data-type='success'] {
			.toast-title,
			.toast-icon {
				@apply text-success;
			}
		}

		&[data-type='warning'] {
			.toast-title,
			.toast-icon {
				@apply text-warning;
			}
		}
	}
</style>
