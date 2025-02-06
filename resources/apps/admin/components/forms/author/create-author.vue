<script setup>
	import { createAuthorSchema } from '@/js/lib/validators';
	import { Button } from '../../ui/button';
	import { Dropzone } from '../../ui/dropzone';
	import { Form, FormField, FormItem, FormLabel } from '../../ui/form';
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

	const createAuthor = (v) => console.log(v);
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
				v-slot="{ onSubmit, canReset, canSubmit, isSubmitting }"
				name="create-author"
				:validation-schema="createAuthorSchema"
			>
				<SheetHeader>
					<SheetTitle>Create Author</SheetTitle>
					<SheetDescription class="hidden">Fill in the form below to create a new author.</SheetDescription>
				</SheetHeader>
				<SheetContent>
					<form id="create-author" class="form" @submit.prevent="onSubmit(createAuthor)">
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
					<Button type="reset" form="create-author" variant="secondary" :disabled="!canReset">Reset</Button>
					<Button type="submit" form="create-author" variant="primary" :disabled="!canSubmit && isSubmitting">
						Create Author
					</Button>
				</SheetFooter>
			</Form>
		</SheetModal>
	</Sheet>
</template>
