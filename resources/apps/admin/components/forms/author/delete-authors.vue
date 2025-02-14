<script setup>
	import { router } from '@inertiajs/vue3';
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';
	import { computed, ref } from 'vue';

	import { Button } from '../../ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogModal,
		DialogTitle,
		DialogTrigger,
	} from '../../ui/dialog';
	import { toast } from '../../ui/sonner';

	const props = defineProps({
		values: { type: Array, required: true },
	});

	const values = computed(() => props.values);
	const open = ref(false);

	const { mutateAsync, status, error } = useMutation({
		mutationKey: ['deleteAuthor'],
		mutationFn: (data) => axios.delete('/api/authors', { data: { ids: data } }),
		onSuccess: () => {
			open.value = false;
			router.reload();
		},
	});

	const deleteAuthor = async () => {
		const messages = {
			pending: 'Deleting author',
			error: error.value?.response?.data?.message || 'An error occurred',
			success: 'Author deleted successfully',
		};

		toast.promise(mutateAsync(values.value), {
			description: computed(() => messages[status.value]),
		});
	};
</script>

<template>
	<Dialog v-model:open="open">
		<DialogTrigger as-child :disabled="status === 'pending'">
			<Button variant="danger">
				<i class="ri-delete-bin-line"></i>
				<span>Delete Author{{ values.length > 1 ? 's' : '' }}</span>
				<span class="flex size-5 items-center justify-center rounded-full bg-white/30 text-xs/none text-white">
					{{ values.length }}
				</span>
			</Button>
		</DialogTrigger>
		<DialogModal>
			<DialogHeader>
				<i class="ri-alert-line text-3xl font-medium text-destructive" />
				<DialogTitle>Warning!</DialogTitle>
			</DialogHeader>
			<DialogContent> Are you sure you want to delete this author? This action cannot be undone. </DialogContent>
			<DialogFooter class="justify-end">
				<Button variant="secondary" :disabled="status === 'pending'" @click="open = false">Cancel</Button>
				<Button variant="danger" :disabled="status === 'pending'" @click="deleteAuthor"> Delete </Button>
			</DialogFooter>
		</DialogModal>
	</Dialog>
</template>
