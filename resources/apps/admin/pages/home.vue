<script setup>
	import { router } from '@inertiajs/vue3';
	import { useMutation } from '@tanstack/vue-query';
	import axios from 'axios';
	import { configure, useForm } from 'vee-validate';

	import { loginSchema } from '@/js/lib/validators';
	import { computed } from 'vue';
	import { Button } from '../components/ui/button';
	import { Card } from '../components/ui/card';
	import { Checkbox } from '../components/ui/checkbox';
	import { FormControl, FormField, FormItem, FormLabel } from '../components/ui/form';
	import { useFormStates } from '../components/ui/form/use-form-valid';
	import { Input } from '../components/ui/input';
	import { toast, Toaster } from '../components/ui/sonner';

	configure({
		validateOnBlur: false,
		validateOnChange: true,
		validateOnInput: true,
		validateOnModelUpdate: false,
	});

	const { handleSubmit, handleReset, isSubmitting, meta } = useForm({
		validationSchema: loginSchema,
		initialValues: {
			email: '',
			password: '',
			remember: false,
		},
	});

	const { canSubmit } = useFormStates(meta);

	const { mutateAsync, error, status } = useMutation({
		mutationKey: ['login'],
		mutationFn: (values) => axios.post('http://admin.readezy.test/api/login', values),
		onSuccess: () => router.visit('/dashboard'),
		onError: (error) => console.log(error),
	});

	const login = handleSubmit((data) => {
		toast.promise(mutateAsync(data), {
			loading: 'Logging in...',
			description: computed(
				() =>
					({
						success: 'Logged in successfully',
						error: error.value?.response?.data.message,
					})[status.value],
			),
			duration: computed(() => (status.value === 'error' ? Infinity : undefined)),
		});
	});
</script>

<template>
	<div class="flex h-dvh px-6 py-12 container">
		<Card class="m-auto px-6 py-6 sm:w-full sm:max-w-sm">
			<h2 class="text-gray-900 text-center text-2xl/none font-bold tracking-tight">Admin Login</h2>
			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form class="space-y-6" @submit.prevent="login" @reset="handleReset">
					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel class="font-medium">Email address</FormLabel>
							<FormControl>
								<Input v-bind="componentField" placeholder="Admin email" type="email" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel class="font-medium">Password</FormLabel>
							<FormControl>
								<Input v-bind="componentField" placeholder="Admin password" type="password" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ handleChange, value }" name="remember">
						<div class="flex gap-2">
							<FormControl>
								<Checkbox :checked="value" @update:checked="handleChange" />
							</FormControl>
							<FormLabel class="font-medium">Remember me</FormLabel>
						</div>
					</FormField>
					<Button class="w-full" type="submit" :disabled="!canSubmit || isSubmitting">Sign In</Button>
				</form>
			</div>
		</Card>
	</div>
	<Toaster />
</template>
