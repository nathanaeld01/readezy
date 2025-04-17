import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { type EditAuthor, editAuthorValidator } from '@/admin/lib/validators/author';

export const EditAuthorForm = ({
	data,
	onSuccess,
	slug,
}: {
	data: EditAuthor;
	onSuccess?: () => void;
	slug: string;
}) => {
	const { mutateAsync: editAuthor } = useMutation<EditAuthor, AxiosError, EditAuthor>({
		mutationFn: async values =>
			await axios.postForm(`/api/author/${slug}`, { ...values, _method: 'PATCH' }),
		mutationKey: ['edit-author'],
		onSuccess: () => {
			router.reload({ only: ['author'] });
			onSuccess?.();
		},
	});

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: {} as EditAuthor,
		onSubmit: async ({ value }) => await editAuthor(value),
		validators: {
			onSubmit: editAuthorValidator,
		},
	});

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		await handleSubmit();
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={submitHandler}>
			<Field name="title">
				{({ handleChange, state }) => (
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							onChange={e => handleChange(e.target.value)}
							placeholder="Enter author's name"
							value={state.value ?? data.title}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Field name="image_url">
				{({ handleChange }) => (
					<div className="space-y-2">
						<Label htmlFor="image_url">Image</Label>
						<Input
							accept="image/jpg"
							id="image_url"
							onChange={e => handleChange(e.target.files?.[0])}
							type="file"
						/>
					</div>
				)}
			</Field>
			<Field name="description">
				{({ handleChange, state }) => (
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							onChange={e => handleChange(e.target.value)}
							value={state.value ?? data.description}
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
							value={state.value ?? data.date_of_birth}
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
							value={state.value ?? data.date_of_death}
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
					<div className="space-y-2">
						<Label htmlFor="nationality">Nationality</Label>
						<Input
							id="nationality"
							onChange={e => handleChange(e.target.value)}
							value={state.value ?? data.nationality}
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
							value={state.value ?? data.website_url}
						/>
						{state.meta.errors && (
							<p className="text-xs/none text-destructive/70">
								{state.meta.errors[0]?.message}
							</p>
						)}
					</div>
				)}
			</Field>
			<Subscribe selector={state => [state.canSubmit, state.isSubmitting, state.isDirty]}>
				{([canSubmit, isSubmitting, isDirty]) => (
					<Button disabled={!canSubmit || isSubmitting || !isDirty} type="submit">
						{isSubmitting ? 'Updating...' : 'Update Author'}
					</Button>
				)}
			</Subscribe>
		</form>
	);
};
