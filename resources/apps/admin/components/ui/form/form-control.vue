<script setup>
	import { Slot } from 'radix-vue';
	import { useFormField } from './useFormField';

	const { error, formItemId } = useFormField();
</script>

<template>
	<Slot :id="formItemId" :aria-invalid="!!error">
		<slot />
	</Slot>
</template>
