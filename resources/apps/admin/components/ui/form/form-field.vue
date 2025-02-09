<script lang="ts" setup>
	import { useId } from 'radix-vue';
	import { Field as FF } from 'vee-validate';
	import { provide } from 'vue';

	import { FORM_ITEM_INJECTION_KEY } from './injectionKeys';

	const props = defineProps({
		name: { type: String, required: true },
		validateOnChange: { type: Boolean, default: false },
	});

	const id = useId();
	provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
	<FF v-slot="{ ...fieldProps }" :name="props.name" :validate-on-change="props.validateOnChange">
		<slot v-bind="fieldProps" />
	</FF>
</template>
