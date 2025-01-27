<script setup>
	import { Link } from "@inertiajs/vue3";
	import clsx from "clsx";
	import { buttonVariants } from "../button";

	const props = defineProps({
		href: { type: String, required: true },
		class: { type: null, required: false },
	});
</script>

<template>
	<Link :href="props.href" :class="clsx(buttonVariants({ variant: 'ghost' }), props.class)">
		<slot />
	</Link>
</template>
