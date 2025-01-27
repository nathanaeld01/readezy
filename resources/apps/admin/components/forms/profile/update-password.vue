<script setup>
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';
	import { configure, useForm } from 'vee-validate';
	import { computed } from 'vue';

	import { updatePasswordSchema } from '@/js/validators/profile';
	import { Button } from '../../ui/button';
	import { CardContent, CardFooter } from '../../ui/card';
	import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
	import { useFormStates } from '../../ui/form/use-form-valid';
	import { Input } from '../../ui/input';
	import { toast } from '../../ui/sonner';

	configure({
		validateOnBlur: false,
		validateOnChange: true,
		validateOnInput: true,
	});

	const { handleSubmit, resetForm, meta, isSubmitting } = useForm({
		name: 'update-password',
		validationSchema: updatePasswordSchema,
		initialValues: {
			current_password: '',
			new_password: '',
			confirm_password: '',
		},
	});
	const { canReset, canSubmit } = useFormStates(meta);

	const { mutateAsync, error, status } = useMutation({
		mutationKey: ['update-password'],
		mutationFn: (values) => axios.patch('/api/profile/update-password', values),
	});

	const updatePassword = handleSubmit(async (values) => {
		toast.promise(mutateAsync(values), {
			loading: 'Updating password...',
			description: computed(
				() =>
					({
						success: 'Password updated successfully.',
						error: error.value?.response?.data.message || 'Failed to update password.',
					})[status.value],
			),
		});
	});
</script>

<template>
	<CardContent class="max-w-xl space-y-4 p-6">
		<form id="update-password" class="form" @submit.prevent="updatePassword">
			<FormField v-slot="{ componentField }" mo name="current_password">
				<FormItem>
					<FormLabel>Current Password</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="password" placeholder="Enter your current password" />
					</FormControl>
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="new_password">
				<FormItem>
					<FormLabel>New Password</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="password" placeholder="Enter your new password" />
					</FormControl>
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="confirm_password">
				<FormItem>
					<FormLabel>Confirm Password</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="password" placeholder="Confirm your new password" />
					</FormControl>
				</FormItem>
			</FormField>
		</form>
	</CardContent>
	<CardFooter class="justify-end gap-4">
		<Button form="update-password" variant="secondary" :disabled="!canReset || isSubmitting" @click="resetForm">
			Reset
		</Button>
		<Button form="update-password" type="submit" :disabled="!canSubmit || isSubmitting">Update Password</Button>
	</CardFooter>
</template>
