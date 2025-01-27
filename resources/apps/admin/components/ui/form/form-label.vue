<script setup>
	import { Label } from '@/admin/components/ui/label';
	import { useFormField } from './useFormField';

	const props = defineProps({
		for: { type: String, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});

	const { formItemId } = useFormField();
</script>

<template>
	<Label class="form-label" :class="props.class" :for="formItemId">
		<slot />
	</Label>
</template>
