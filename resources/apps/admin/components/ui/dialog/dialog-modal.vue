<script setup>
	import { DialogContent as DM, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'radix-vue';
	import { computed, onMounted, onUnmounted, ref } from 'vue';

	const props = defineProps({
		forceMount: { type: Boolean, required: false },
		trapFocus: { type: Boolean, required: false },
		disableOutsidePointerEvents: { type: Boolean, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});
	const emits = defineEmits([
		'escapeKeyDown',
		'pointerDownOutside',
		'focusOutside',
		'interactOutside',
		'openAutoFocus',
		'closeAutoFocus',
	]);

	const mounted = ref(false);
	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwarded = useForwardPropsEmits(delegatedProps, emits);

	onMounted(() => {
		mounted.value = true;
	});

	onUnmounted(() => {
		mounted.value = false;
	});
</script>

<template>
	<DialogPortal v-if="mounted" to="#modal-root">
		<DialogOverlay class="dialog-overlay" />
		<DM class="dialog" v-bind="forwarded" :class="props.class">
			<slot />
		</DM>
	</DialogPortal>
</template>
