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
		mutationFn: async values => await axios.patchForm(`/api/author/${slug}`, values),
		mutationKey: ['edit-author'],
		onSuccess: () => {
			router.reload({ only: ['author'] });
			onSuccess?.();
		},
	});

	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: data,
		onSubmit: async ({ value }) => {
			type EditAuthorKeys = keyof EditAuthor;

			// Filter out 'image' and cast keys to EditAuthorKeys
			const dirtyFields = (Object.keys(value) as EditAuthorKeys[])
				.filter(key => key !== 'image') // Explicitly exclude 'image'
				.reduce((acc, key) => {
					if (value[key] !== data[key]) {
						acc[key] = value[key];
					}
					return acc;
				}, {} as Partial<EditAuthor>);

			return await editAuthor(dirtyFields);
		},
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
			<Field name="description">
				{({ handleChange, state }) => (
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							onChange={e => handleChange(e.target.value)}
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
					<div className="space-y-2">
						<Label htmlFor="nationality">Nationality</Label>
						<Input
							id="nationality"
							onChange={e => handleChange(e.target.value)}
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
