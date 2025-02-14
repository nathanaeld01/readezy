<script setup>
	import { router } from '@inertiajs/vue3';
	import { watchDebounced } from '@vueuse/core';
	import { inject, ref, watch } from 'vue';

	import { Input } from '../../ui/input';

	const props = defineProps({
		value: { type: String, default: '', required: false },
	});
	const value = ref(props.value);

	const route = inject('route');

	watch(
		() => props.value,
		(newValue) => {
			value.value = newValue;
		},
	);
	watchDebounced(
		value,
		(value) =>
			router.get(route('admin.authors.index'), value ? { search: value } : {}, {
				preserveState: true,
				only: ['authors', 'pagination'],
			}),
		{ debounce: 750 },
	);
</script>

<template>
	<Input v-model:model-value="value" placeholder="Search author by name" icon="ri-search-line" />
</template>
