import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { router } from '@inertiajs/react';

import { type CreateAuthor, createAuthorValidator } from '@/admin/lib/validators/author';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';

export const CreateAuthorForm = ({ onSubmit }: { onSubmit?: () => void }) => {
	const { mutateAsync: createAuthor } = useMutation<CreateAuthor, AxiosError, CreateAuthor>({
		mutationKey: ['create-author'],
		mutationFn: async values => (await axios.postForm('/api/author', values)).data,
		onError: error => console.log(error.response?.data),
		onSuccess: () => {
			router.reload({ only: ['authors', 'pagination'] });
		},
	});

	const { handleSubmit, Field, Subscribe } = useForm({
		defaultValues: {
			title: '',
			description: '',
			date_of_birth: '',
			nationality: '',
			date_of_death: undefined,
			website_url: undefined,
		} as CreateAuthor,
		validators: {
			onSubmit: createAuthorValidator,
		},
		onSubmit: async ({ value }) => {
			await createAuthor(value);
			onSubmit?.();
		},
	});

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		handleSubmit();
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={submitHandler}>
			<Field name="title">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							placeholder="Author Name"
							value={state.value}
							onChange={e => handleChange(e.target.value)}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="image">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="image">Image</Label>
						<Input
							id="image"
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/webp"
							onChange={e => handleChange(e.target.files![0])}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="description">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Author Description"
							value={state.value}
							onChange={e => handleChange(e.target.value)}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="date_of_birth">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="date_of_birth">Date of Birth</Label>
						<Input
							id="date_of_birth"
							type="date"
							value={state.value}
							onChange={e => handleChange(e.target.value)}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="date_of_death">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="date_of_death">Date of Death</Label>
						<Input
							id="date_of_death"
							type="date"
							value={state.value}
							onChange={e => handleChange(e.target.value)}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="nationality">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="nationality">Nationality</Label>
						<Input
							id="nationality"
							placeholder="Author Nationality"
							value={state.value}
							onChange={e => handleChange(e.target.value)}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="website_url">
				{({ state, handleChange }) => (
					<div className="space-y-1.5">
						<Label htmlFor="website_url">Website Link</Label>
						<Input
							id="website_url"
							placeholder="Author Website"
							value={state.value}
							onChange={e => handleChange(e.target.value)}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
				{([canSubmit, isSubmitting]) => (
					<Button type="submit" disabled={!canSubmit || isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Create Author'}
					</Button>
				)}
			</Subscribe>
		</form>
	);
};
