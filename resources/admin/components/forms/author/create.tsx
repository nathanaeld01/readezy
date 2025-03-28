import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { type CreateAuthor, createAuthorValidator } from '@/admin/lib/validators/author';

export const CreateAuthorForm = ({ onSubmit }: { onSubmit?: () => void }) => {
	const { mutateAsync: createAuthor } = useMutation<CreateAuthor, AxiosError, CreateAuthor>({
		mutationFn: async values => (await axios.postForm('/api/author', values)).data,
		mutationKey: ['create-author'],
		onError: error => console.log(error.response?.data),
		onSuccess: () => {
			router.reload({ only: ['authors', 'pagination'] });
		},
	});

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: {
			date_of_birth: '',
			date_of_death: undefined,
			description: '',
			nationality: '',
			title: '',
			website_url: undefined,
		} as CreateAuthor,
		onSubmit: async ({ value }) => {
			await createAuthor(value);
			onSubmit?.();
		},
		validators: {
			onSubmit: createAuthorValidator,
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							onChange={e => handleChange(e.target.value)}
							placeholder="Author Name"
							type="text"
							value={state.value}
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="image">Image</Label>
						<Input
							accept="image/png, image/jpeg, image/jpg, image/webp"
							id="image"
							onChange={e => handleChange(e.target.files![0])}
							type="file"
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							onChange={e => handleChange(e.target.value)}
							placeholder="Author Description"
							value={state.value}
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="date_of_birth">Date of Birth</Label>
						<Input
							id="date_of_birth"
							onChange={e => handleChange(e.target.value)}
							type="date"
							value={state.value}
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="date_of_death">Date of Death</Label>
						<Input
							id="date_of_death"
							onChange={e => handleChange(e.target.value)}
							type="date"
							value={state.value}
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="nationality">Nationality</Label>
						<Input
							id="nationality"
							onChange={e => handleChange(e.target.value)}
							placeholder="Author Nationality"
							value={state.value}
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
				{({ handleChange, state }) => (
					<div className="space-y-1.5">
						<Label htmlFor="website_url">Website Link</Label>
						<Input
							id="website_url"
							onChange={e => handleChange(e.target.value)}
							placeholder="Author Website"
							value={state.value}
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
					<Button disabled={!canSubmit || isSubmitting} type="submit">
						{isSubmitting ? 'Creating...' : 'Create Author'}
					</Button>
				)}
			</Subscribe>
		</form>
	);
};
