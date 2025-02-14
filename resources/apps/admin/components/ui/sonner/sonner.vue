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
