<script setup>
	import { useFormField } from "./useFormField";

	const props = defineProps({
		class: { type: null, required: false },
	});

	const { formDescriptionId } = useFormField();
</script>

<template>
	<p :id="formDescriptionId" class='text-sm text-muted-foreground'>
		<slot />
	</p>
</template>
