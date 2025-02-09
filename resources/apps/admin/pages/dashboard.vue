<script setup>
	import { Head } from '@inertiajs/vue3';

	import { AppLayout } from '@/admin/layout';
	import { Card } from '../components/ui/card';
</script>

<template>
	<Head title="Dashboard" />
	<AppLayout>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card></Card>
			<Card></Card>
			<Card></Card>
			<Card></Card>
		</div>
	</AppLayout>
</template>
