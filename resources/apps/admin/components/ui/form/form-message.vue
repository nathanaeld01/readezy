<script setup>
	import { ErrorMessage } from "vee-validate";
	import { toValue } from "vue";
	
	import { useFormField } from "./useFormField";

	const { error, name } = useFormField();
</script>

<template>
	<ErrorMessage
		:id="name"
		as="p"
		:name="toValue(name)"
		class="-mt-1.5 text-xs font-medium text-destructive opacity-75"
	>
		{{ error }}
	</ErrorMessage>
</template>
