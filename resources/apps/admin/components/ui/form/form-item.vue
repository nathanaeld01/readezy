<script setup>
	import clsx from 'clsx';

	import { useFormField } from './useFormField';

	const props = defineProps({
		class: { type: null, required: false },
	});

	const { error } = useFormField();
</script>

<template>
	<div class="form-item" :class="clsx(!!error && 'form-error', props.class)">
		<slot />
	</div>
</template>
