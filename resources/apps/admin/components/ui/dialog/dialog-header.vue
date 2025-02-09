<script setup>
	import DialogClose from "./dialog-close.vue";
	import { Button } from "../button";

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<div
		class="dialog-header"
		:class="props.class"
	>
		<slot />
		<DialogClose as-child>
			<Button class="dialog-close" variant="ghost" icon>
				<i class="ri-close-fill text-xl" />
			</Button>
		</DialogClose>
	</div>
</template>
