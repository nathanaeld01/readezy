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
		slug: { type: String, required: true },
	});

	const open = ref(false);

	const { mutateAsync, status, error } = useMutation({
		mutationKey: ['deleteAuthor'],
		mutationFn: async () => {
			await axios.delete(`/authors/${props.slug}`);
		},
		onMutate: () => {
			open.value = false;
		},
		onSuccess: () => {
			router.reload();
		},
	});

	const deleteAuthor = async () => {
		const messages = {
			pending: 'Deleting author',
			error: error.value?.response?.data?.message || 'An error occurred',
			success: 'Author deleted successfully',
		};

		toast.promise(mutateAsync(), {
			description: computed(() => messages[status.value]),
		});
	};
</script>

<template>
	<Dialog v-model:open="open">
		<DialogTrigger as-child :disabled="status === 'pending'">
			<Button variant="danger" icon title="Delete Author">
				<i class="ri-delete-bin-line" />
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
