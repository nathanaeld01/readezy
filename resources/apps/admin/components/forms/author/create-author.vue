<script setup>
	import { router } from '@inertiajs/vue3';
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';

	import { createAuthorSchema } from '@/js/lib/validators';
	import { Button } from '../../ui/button';
	import { Dropzone } from '../../ui/dropzone';
	import { FormField, FormItem, FormLabel } from '../../ui/form';
	import Form from '../../ui/form/form.vue';
	import { Input, Textarea } from '../../ui/input';
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetModal,
		SheetTitle,
		SheetTrigger,
	} from '../../ui/sheet';

	const { mutateAsync } = useMutation({
		mutationKey: ['createAuthor'],
		mutationFn: (values) => axios.postForm('/api/authors/create', values),
		onSuccess: () => router.reload({ only: ['authors'] }),
		onError: (error) => console.error('Error creating author:', error),
	});

	const createAuthor = (v) => mutateAsync(v);
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
			<Form
				v-slot="{ handleSubmit, handleReset, isResettable, isSubmittable }"
				name="create-author"
				:validation-schema="createAuthorSchema"
				:initial-values="{ image: null, name: '', description: '' }"
			>
				<SheetHeader>
					<SheetTitle>Create Author</SheetTitle>
					<SheetDescription class="hidden">Fill in the form below to create a new author.</SheetDescription>
				</SheetHeader>
				<SheetContent>
					<form id="create-author" class="form" @submit="handleSubmit($event, createAuthor)">
						<FormField v-slot="{ componentField }" name="image">
							<FormItem>
								<FormLabel>Image</FormLabel>
								<Dropzone v-bind="componentField" accept="image/*" />
							</FormItem>
						</FormField>
						<FormField v-slot="{ componentField }" name="name">
							<FormItem>
								<FormLabel>Name</FormLabel>
								<Input v-bind="componentField" type="text" placeholder="Enter author's name" />
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
					<Button form="create-author" variant="secondary" :disabled="!isResettable" @click="handleReset">
						Reset
					</Button>
					<Button type="submit" form="create-author" variant="primary" :disabled="!isSubmittable">
						Create Author
					</Button>
				</SheetFooter>
			</Form>
		</SheetModal>
	</Sheet>
</template>
