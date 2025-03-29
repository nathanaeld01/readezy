import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';

import { Button } from '../../ui/button';
import { type DeleteAuthor } from '@/admin/lib/validators/author';

export const DeleteAuthorsForm = ({
	onReset,
	onSuccess,
	selectedAuthors,
}: {
	onReset?: () => void;
	onSuccess?: () => void;
	selectedAuthors: string[] | undefined;
}) => {
	const { mutateAsync: deleteAuthor } = useMutation<DeleteAuthor, AxiosError, DeleteAuthor>({
		mutationFn: async values =>
			await axios.delete('/api/author', {
				data: values,
			}),
		mutationKey: ['delete-authors'],
		onSuccess: () => {
			router.reload({ only: ['authors', 'pagination'] });
			onSuccess?.();
		},
	});

	const { handleSubmit } = useForm({
		defaultValues: {
			slugs: selectedAuthors,
		} as DeleteAuthor,
		onSubmit: async ({ value }) => await deleteAuthor(value),
	});

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		handleSubmit();
	};

	return (
		<form className="flex justify-end gap-4" onSubmit={submitHandler}>
			<Button onClick={onReset}>Cancel</Button>
			<Button type="submit" variant="destructive">
				Delete Authors
			</Button>
		</form>
	);
};
