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
	.sheet-overlay {
		@apply fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0;
	}

	.sheet {
		@apply fixed z-50 grid grid-rows-[auto_1fr_auto] bg-white px-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out;

		&.sheet-top {
			@apply inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top;
		}

		&.sheet-bottom {
			@apply inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom;
		}

		&.sheet-left {
			@apply inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm;
		}

		&.sheet-right {
			@apply inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm;
		}
	}
</style>
