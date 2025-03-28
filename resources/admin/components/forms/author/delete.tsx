import { useForm, useStore } from '@tanstack/react-form';
import { router } from '@inertiajs/react';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';

import { type DeleteAuthor } from '@/admin/lib/validators/author';
import { Button } from '../../ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog';

export const DeleteAuthorsForm = ({
	selectedAuthors,
	onReset,
}: {
	selectedAuthors: string[] | undefined;
	onReset?: () => void;
}) => {
	const { mutateAsync: deleteAuthor } = useMutation<DeleteAuthor, AxiosError, DeleteAuthor>({
		mutationKey: ['delete-authors'],
		mutationFn: async values =>
			await axios.delete('/api/author', {
				data: values,
			}),
		onSuccess: () => router.reload({ only: ['authors', 'pagination'] }),
	});

	const { handleSubmit, store } = useForm({
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

	const state = useStore(store, state => state.values.slugs);

	return (
		state &&
		state.length > 0 && (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">
						<i className="hgi hgi-stroke hgi-delete-02" />
						<span>Delete Authors</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader className="flex-col gap-4">
						<DialogTitle>
							<i className="hgi hgi-stroke hgi-alert-02 text-3xl/none text-destructive" />
							Delete Authors
						</DialogTitle>
						<DialogDescription className="space-y-2">
							<p>
								This action will permanently remove the selected authors and their
								associated data from the system. This cannot be undone.
							</p>
							<p>Are you sure you want to proceed?</p>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<form className="flex justify-end gap-4" onSubmit={submitHandler}>
							<DialogClose asChild>
								<Button onClick={onReset}>Cancel</Button>
							</DialogClose>
							<Button type="submit" variant="destructive">
								Delete Authors
							</Button>
						</form>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	);
};
