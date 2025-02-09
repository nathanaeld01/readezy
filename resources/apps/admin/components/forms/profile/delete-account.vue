<script setup lang="ts">
	import { useForm } from 'vee-validate';

	import { DeleteAccount, deleteAccountSchema } from '@/js/validators/profile';
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
	import { FormControl, FormField, FormItem } from '../../ui/form';
	import { useFormStates } from '../../ui/form/use-form-valid';
	import { Input } from '../../ui/input';

	const { handleSubmit, meta, isSubmitting } = useForm<DeleteAccount>({
		name: 'delete-account',
		validationSchema: deleteAccountSchema,
		initialValues: {
			password: '',
		},
	});
	const { canSubmit } = useFormStates(meta);

	const deleteAccount = handleSubmit((values) => {
		console.log(values);
	});
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button variant="danger" :disabled="isSubmitting">Delete Account</Button>
		</DialogTrigger>
		<DialogModal>
			<DialogHeader>
				<DialogTitle>Delete Account</DialogTitle>
			</DialogHeader>
			<DialogContent>
				<p class="text-sm text-foreground/70">
					Are you sure you want to delete your account? Once your account is deleted, all of its resources and
					data will be permanently deleted. Please enter your password to confirm you would like to
					permanently delete your account.
				</p>
				<form id="delete-account" class="form mt-6" @submit.prevent="deleteAccount">
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
				<Button variant="danger" type="submit" form="delete-account" :disabled="isSubmitting || !canSubmit">
					Delete Account
				</Button>
			</DialogFooter>
		</DialogModal>
	</Dialog>
</template>
