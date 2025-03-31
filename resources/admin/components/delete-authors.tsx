import { RowSelectionState } from '@tanstack/react-table';

import { DeleteAuthorsForm } from './forms/author';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

export const DeleteAuthors = ({
	authors: authorProp,
	setAuthors,
}: {
	authors: RowSelectionState;
	setAuthors: (values: RowSelectionState) => void;
}) => {
	const authors = Object.keys(authorProp);
	return (
		authors?.length > 0 && (
			<Dialog>
				{({ onClose }) => (
					<>
						<DialogTrigger>
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
								<DialogDescription>
									<p>
										This action will permanently remove the selected authors and
										their associated data from the system. This cannot be
										undone.
									</p>
									<p>Are you sure you want to proceed?</p>
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DeleteAuthorsForm
									onReset={() => setAuthors({})}
									onSuccess={onClose}
									selectedAuthors={Object.keys(authors)}
								/>
							</DialogFooter>
						</DialogContent>
					</>
				)}
			</Dialog>
		)
	);
};
