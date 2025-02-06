<script setup>
	import { Label } from '@/admin/components/ui/label';

	const props = defineProps({
		for: { type: String, required: false },
		asChild: { type: Boolean, required: false },
		as: { type: null, required: false },
		class: { type: null, required: false },
	});
</script>

<template>
	<Label class="form-label" :class="props.class">
		<slot />
	</Label>
</template>
