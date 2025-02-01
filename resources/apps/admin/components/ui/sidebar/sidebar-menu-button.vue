<script setup>
	defineProps({
		icon: {
			type: String,
			required: true,
		},
		collapsible: {
			type: Boolean,
			default: false,
		},
		iconVariant: {
			type: Boolean,
			default: true,
		},
	});
</script>

<template>
	<button
		type="button"
		class="flex h-8 w-full items-center justify-between rounded-md px-2.5 py-2 text-sm font-normal text-foreground transition-[background,color] duration-200 select-none hover:bg-accent hover:text-accent-foreground"
	>
		<span class="flex items-center gap-2.5">
			<i :class="`ri-${icon}${iconVariant ? '-line' : ''} text-lg`" />
			<span>
				<slot />
			</span>
		</span>
		<i v-if="collapsible" class="ri-arrow-down-s-line text-lg" />
	</button>
</template>
