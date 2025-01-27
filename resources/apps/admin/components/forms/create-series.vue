<script setup>
	import { createSeriesSchema } from '@/js/lib/validators';
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';
	import { useForm } from 'vee-validate';
	import { computed, watch } from 'vue';
	import { toast } from '../ui/sonner';

	import { Button } from '../ui/button';
	import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
	import { useFormStates } from '../ui/form/use-form-valid';
	import { Input } from '../ui/input';
	import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from '../ui/sheet';

	const { handleSubmit, handleReset, isSubmitting, isFieldDirty, isFieldValid, values } = useForm({
		validationSchema: createSeriesSchema,
		initialValues: {
			title: '',
			author: '',
		},
	});

	const { canSubmit, canReset } = useFormStates(values, {
		isFieldDirty,
		isFieldValid,
	});

	const { mutateAsync, error, status } = useMutation({
		mutationKey: ['createSeries'],
		mutationFn: (values) => axios.post('/api/series/create', values),
	});

	const createSeries = handleSubmit(async (data) => {
		toast.promise(mutateAsync(data), {
			loading: 'Creating series...',
			description: computed(
				() =>
					({
						success: 'Series created successfully!',
						error: error.value?.response.data.message ?? 'An error occurred',
					})[status.value],
			),
		});
	});

	watch(error, (newErrors) => {
		console.log(newErrors?.response.data.message);
	});

	const resetSeries = () => handleReset();
</script>

<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button>
				<i class="ri-add-line" />
				Add Series
			</Button>
		</SheetTrigger>
		<SheetModal>
			<SheetHeader>
				<SheetTitle>Add Series</SheetTitle>
			</SheetHeader>
			<SheetContent>
				<form id="create-series" class="form" @submit.prevent="createSeries" @reset="resetSeries">
					<FormField v-slot="{ componentField }" name="title">
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input v-bind="componentField" placeholder="Enter series name" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="author">
						<FormItem>
							<FormLabel>Author</FormLabel>
							<FormControl>
								<Input v-bind="componentField" placeholder="Enter author name" />
							</FormControl>
						</FormItem>
					</FormField>
				</form>
			</SheetContent>
			<SheetFooter class="flex-col">
				<Button form="create-series" variant="secondary" size="sm" type="reset" :disabled="!canReset">
					Reset Form
				</Button>
				<Button form="create-series" size="sm" type="submit" :disabled="!canSubmit || isSubmitting">
					Create Series
				</Button>
			</SheetFooter>
		</SheetModal>
	</Sheet>
</template>
