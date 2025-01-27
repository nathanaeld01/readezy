<script setup>
	import { cn } from '@/js/lib/utils';
	import { Button } from '../button';
	import SheetClose from './sheet-close.vue';

	const props = defineProps({
		class: { type: null, required: false },
	});
</script>

<template>
	<div :class="cn('flex w-full items-center justify-between gap-2 px-5 py-6', props.class)">
		<slot />
		<div class="-mr-2 flex items-center gap-2">
			<SheetClose as-child>
				<Button variant="ghost" size="sm" icon>
					<i class="ri-close-line" />
				</Button>
			</SheetClose>
		</div>
	</div>
</template>
