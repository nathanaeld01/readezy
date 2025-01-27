<script setup>
	import { cn } from "@/js/lib/utils";

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<li class="breadcrumb-item" :class="props.class">
		<slot />
	</li>
</template>
