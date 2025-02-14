<script setup>
	import { router } from '@inertiajs/vue3';
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';
	import { useForm } from 'vee-validate';
	import { computed } from 'vue';

	import { logoutSessionsSchema } from '@/js/validators/profile';
	import { Button } from '../../ui/button';
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogModal,
		DialogTitle,
		DialogTrigger,
	} from '../../ui/dialog';
	import { FormControl, FormField, FormItem } from '../../ui/form';
	import { Input } from '../../ui/input';
	import { toast } from '../../ui/sonner';

	const { handleSubmit } = useForm({
		name: 'browser-sessions',
		validationSchema: logoutSessionsSchema,
		initialValues: {
			password: '',
		},
	});

	const { mutateAsync, error, status } = useMutation({
		mutationKey: ['logoutSession'],
		mutationFn: (values) => axios.delete('/api/browser-sessions', { data: values }),
		onSuccess: () => router.reload(),
	});

	const onSubmit = handleSubmit(async (values) => {
		toast.promise(mutateAsync(values), {
			loading: 'Logging out of other sessions...',
			description: computed(
				() =>
					({
						success: 'You have been logged out of other sessions.',
						error: error.value?.response.data ?? 'There was an error logging out of other sessions.',
					})[status.value],
			),
		});
	});
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button variant="secondary">Log Out Other Browser Sessions </Button>
		</DialogTrigger>
		<DialogModal>
			<DialogHeader>
				<DialogTitle>Log Out Other Browser Sessions </DialogTitle>
			</DialogHeader>
			<DialogContent class="space-y-4">
				<p class="text-foreground/70">
					Please enter your password to confirm you would like to log out of your other browser sessions
					across all of your devices.
				</p>
				<form id="delete-account" class="form mt-6" @submit.prevent="onSubmit">
					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormControl>
								<Input v-bind="componentField" type="password" placeholder="Enter your password" />
							</FormControl>
						</FormItem>
					</FormField>
				</form>
			</DialogContent>
			<DialogFooter class="justify-end">
				<DialogClose>
					<Button variant="secondary">Cancel</Button>
				</DialogClose>
				<Button type="submit" form="delete-account">Log Out Other Sessions</Button>
			</DialogFooter>
		</DialogModal>
	</Dialog>
</template>
