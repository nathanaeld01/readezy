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
	.sheet {
		@apply border-border bg-popover data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 grid grid-rows-[auto_1fr_auto] rounded-md border shadow-lg duration-400;

		&.sheet-top {
			@apply data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-2.5 top-2.5 w-[calc(100%-1.25rem)];
		}

		&.sheet-bottom {
			@apply data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-2.5 bottom-2.5 w-[calc(100%-1.25rem)] border-t;
		}

		&.sheet-left {
			@apply data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-2.5 left-2.5 h-[calc(100%-1.25rem)] w-full max-w-sm border-r md:max-w-md;
		}

		&.sheet-right {
			@apply data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-2.5 right-2.5 h-[calc(100%-1.25rem)] w-full max-w-sm md:max-w-md;
		}
	}

	.sheet-overlay {
		@apply data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 duration-400;
	}
</style>
