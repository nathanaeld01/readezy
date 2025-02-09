<script setup>
	import { DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'radix-vue';

	import { cn } from '@/js/lib/utils';
	import { sheetVariants } from './index';

	defineOptions({
		inheritAttrs: false,
	});

	const {
		side,
		class: classes,
		...props
	} = defineProps({
		class: { type: null, required: false },
		side: { type: null, required: false },
		forceMount: { type: Boolean, required: false },
		trapFocus: { type: Boolean, required: false },
		disableOutsidePointerEvents: { type: Boolean, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
	});

	const emits = defineEmits([
		'escapeKeyDown',
		'pointerDownOutside',
		'focusOutside',
		'interactOutside',
		'openAutoFocus',
		'closeAutoFocus',
	]);

	const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			class="fixed inset-0 z-50 bg-black/80 duration-400 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
		/>
		<DialogContent :class="cn(sheetVariants({ side }), classes)" v-bind="{ ...forwarded, ...$attrs }">
			<slot />
		</DialogContent>
	</DialogPortal>
</template>
