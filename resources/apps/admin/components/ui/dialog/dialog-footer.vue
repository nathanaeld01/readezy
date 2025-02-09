<script setup>
	import { cn } from "@/js/lib/utils";

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<div
		class="dialog-footer"
		:class="props.class"
	>
		<slot />
	</div>
</template>
