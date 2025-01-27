<script setup>
	import { computed } from 'vue';
	import { DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'radix-vue';
	import { sheetVariants } from '.';
import SheetHeader from './sheet-header.vue';
import SheetFooter from './sheet-footer.vue';

	defineOptions({
		inheritAttrs: false,
	});

	const { side, ...props } = defineProps({
		class: { type: null, required: false },
		side: { type: null, required: false },
		forceMount: { type: Boolean, required: false },
		trapFocus: { type: Boolean, required: false },
		disableOutsidePointerEvents: { type: Boolean, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
	});

	const emits = defineEmits([
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus",
	]);

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			class="sheet-overlay"
		/>
		<DialogContent
			v-bind="{ ...forwarded, ...$attrs }"
			:class="sheetVariants({ side })"
		>
			<SheetHeader class="text-center">
				<slot name="header" />
			</SheetHeader>
			<div class="py-6">
				<slot />
			</div>
			<SheetFooter>
				<slot name="footer" />
			</SheetFooter>
		</DialogContent>
	</DialogPortal>
</template>