<script setup>
	import { router, usePage } from '@inertiajs/vue3';
	import { useForm } from 'vee-validate';
	import { computed, toRef } from 'vue';

	import { updateInformationSchema } from '@/js/validators/profile';
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';
	import { Button } from '../../ui/button';
	import { CardContent, CardFooter } from '../../ui/card';
	import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
	import { useFormStates } from '../../ui/form/use-form-valid';
	import { Input } from '../../ui/input';
	import { toast } from '../../ui/sonner';

	const { name, email } = usePage().props.auth.user || {};

	const { handleSubmit, resetForm, meta, isSubmitting } = useForm({
		validationSchema: updateInformationSchema,
		initialValues: {
			avatar: '',
			name,
			email,
		},
	});

	const { canReset, canSubmit } = useFormStates(meta);

	const { mutateAsync, error, status } = useMutation({
		mutationKey: ['update-information'],
		mutationFn: (values) => axios.put('/api/profile/update-information', values),
		onSuccess: () => router.reload({ only: ['auth.user'] }),
	});

	const updateInformation = handleSubmit((values) => {
		const dirtyFields = Object.fromEntries(
			Object.entries(values).filter(([key, value]) => value !== toRef({ name, email }).value[key]),
		);

		toast.promise(mutateAsync(dirtyFields), {
			loading: 'Updating your information...',
			description: computed(
				() =>
					({
						success: 'Your information has been updated successfully.',
						error:
							error.value?.response.data.message || 'An error occurred while updating your information.',
					})[status.value],
			),
		});
	});
</script>

<template>
	<CardContent class="max-w-xl space-y-4 p-6">
		<form id="update-information" class="form" @submit.prevent="updateInformation">
			<FormField v-slot="{ componentField }" name="avatar">
				<FormItem>
					<FormLabel>Avatar</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="file" accept="image/*" />
					</FormControl>
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="name">
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input v-bind="componentField" placeholder="Enter your name" />
					</FormControl>
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="email">
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input v-bind="componentField" placeholder="Enter your email address" />
					</FormControl>
				</FormItem>
			</FormField>
		</form>
	</CardContent>
	<CardFooter class="justify-end gap-4">
		<Button
			form="update-information"
			variant="secondary"
			:disabled="!canReset || isSubmitting"
			@click="resetForm({ values: { name, email } })"
		>
			Reset
		</Button>
		<Button form="update-information" type="submit" :disabled="!canSubmit || isSubmitting">
			Update Information
		</Button>
	</CardFooter>
</template>
