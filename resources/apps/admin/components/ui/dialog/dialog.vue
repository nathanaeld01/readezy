<script setup>
	import { DialogRoot, useForwardPropsEmits } from 'radix-vue';

	const props = defineProps({
		open: { type: Boolean, required: false },
		defaultOpen: { type: Boolean, required: false },
		modal: { type: Boolean, required: false },
	});
	const emits = defineEmits(['update:open']);

	const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DialogRoot v-bind="forwarded">
		<slot />
	</DialogRoot>
</template>

<style lang="postcss">
	.dialog {
		@apply fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr_auto] rounded-md border border-border bg-popover shadow-lg duration-200;

		&[data-state='open'] {
			@apply animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%];
		}

		&[data-state='closed'] {
			@apply animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%];
		}

		.dialog-header {
			@apply flex items-center gap-2.5 border-b border-border px-4 py-2.5;
		}

		.dialog-content {
			@apply p-4;
		}

		.dialog-footer {
			@apply flex items-center gap-2.5 border-t border-border px-4 py-2.5;
		}
	}

	.dialog-overlay {
		@apply fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0;
	}

	.dialog-header {
		.dialog-title {
			@apply text-lg font-semibold leading-none tracking-tight;
		}

		.dialog-close {
			@apply ml-auto;
		}
	}
</style>
