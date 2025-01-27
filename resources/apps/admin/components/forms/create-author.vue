<script setup lang="ts">
	import { useForm } from 'vee-validate';

	import { CreateAuthor, createAuthorSchema } from '@/js/lib/validators';
	import { Button } from '../ui/button';
	import { Dropzone } from '../ui/dropzone';
	import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
	import { useFormStates } from '../ui/form/use-form-valid';
	import { Input, Textarea } from '../ui/input';
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetModal,
		SheetTitle,
		SheetTrigger,
	} from '../ui/sheet';

	const { handleSubmit, handleReset, values, isFieldDirty, isFieldValid, isSubmitting } = useForm<CreateAuthor>({
		validationSchema: createAuthorSchema,
		initialValues: {
			image_url: undefined,
			name: '',
			description: '',
		},
	});

	const { canReset, canSubmit } = useFormStates<CreateAuthor>(values, {
		isFieldDirty,
		isFieldValid,
	});

	const createAuthor = handleSubmit(async (data) => {
		console.log(data);
	});

	const resetAuthor = () => handleReset();
</script>

<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button>
				<i class="ri-add-line" />
				Add Author
			</Button>
		</SheetTrigger>
		<SheetModal>
			<SheetHeader>
				<SheetTitle>Create Author</SheetTitle>
				<SheetDescription class="hidden">Fill in the form below to create a new author.</SheetDescription>
			</SheetHeader>
			<SheetContent>
				<form id="create-author" class="form" @submit.prevent="createAuthor" @reset="resetAuthor">
					<FormField v-slot="{ componentField }" name="image_url">
						<FormItem>
							<FormLabel>Image</FormLabel>
							<Dropzone v-bind="componentField" accept="image/*" />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="name">
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input v-bind="componentField" type="text" placeholder="Enter author's name" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="description">
						<FormItem>
							<FormLabel>Description</FormLabel>
							<Textarea v-bind="componentField" placeholder="Enter author's description" />
						</FormItem>
					</FormField>
				</form>
			</SheetContent>
			<SheetFooter class="flex-col">
				<Button type="reset" form="create-author" variant="secondary" :disabled="!canReset">Reset</Button>
				<Button type="submit" form="create-author" variant="primary" :disabled="!canSubmit && !isSubmitting">
					Create Author
				</Button>
			</SheetFooter>
		</SheetModal>
	</Sheet>
</template>
