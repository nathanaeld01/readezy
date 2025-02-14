<script setup>
	import { Head, usePage } from '@inertiajs/vue3';

	import { AppLayout } from '@/admin/layout';

	const { author } = usePage().props;
</script>

<template>
	<Head :title="`Author: ${author.title}`" />
	<AppLayout :links="[{ name: 'Authors', href: '/authors' }, { name: author.title }]"> </AppLayout>
</template>
