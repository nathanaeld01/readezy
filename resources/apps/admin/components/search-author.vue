<script setup>
	import { router } from '@inertiajs/vue3';
	import { watchDebounced } from '@vueuse/core';
	import { inject, ref } from 'vue';
	import { Input } from './ui/input';

	const route = inject('route');

	const value = ref(route().params?.search ?? '');

	watchDebounced(
		() => value.value,
		(value) => {
			const params = value ? { search: value } : {};
			router.get(route('admin.authors.index'), params, { only: ['authors'] });
		},
		{ debounce: 750 },
	);
</script>

<template>
	<Input v-model="value" placeholder="Search author by name" />
</template>
