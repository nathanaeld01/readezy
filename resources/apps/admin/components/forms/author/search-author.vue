<script setup>
	import { router } from '@inertiajs/vue3';
	import { watchDebounced } from '@vueuse/core';
	import { inject, ref } from 'vue';

	import { Input } from '../../ui/input';

	const props = defineProps({
		value: { type: String, required: false },
	});
	const value = ref(props.value || '');

	const route = inject('route');

	watchDebounced(
		value,
		(value) =>
			router.get(route('admin.authors.index'), value ? { search: value } : {}, {
				preserveState: true,
				only: ['authors'],
			}),
		{ debounce: 750 },
	);
</script>

<template>
	<Input
		:default-value="value"
		placeholder="Search author by name"
		icon="ri-search-line"
		@update:model-value="value = $event"
	/>
</template>
