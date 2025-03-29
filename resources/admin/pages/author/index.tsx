import { Head } from '@inertiajs/react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';

import { ViewAuthorsTable } from '@/admin/components/author/view-table';
import { CreateAuthorForm, DeleteAuthorsForm } from '@/admin/components/forms/author';
import { Button } from '@/admin/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '@/admin/components/ui/dialog';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetModal,
	SheetTitle,
	SheetTrigger,
} from '@/admin/components/ui/sheet';
import { AdminLayout } from '@/admin/layouts';

export default function Author() {
	const [selectedAuthors, setSelectedAuthors] = useState<RowSelectionState>({});

	return (
		<>
			<Head title="Authors" />
			<div className="flex items-center justify-between">
				<h2 className="text-2xl/none font-semibold">Authors</h2>
				<div className="flex items-center gap-2">
					<DeleteAuthors authors={selectedAuthors} setAuthors={setSelectedAuthors} />
					<AddAuthor />
				</div>
			</div>
			<ViewAuthorsTable onSelect={setSelectedAuthors} selected={selectedAuthors} />
		</>
	);
}

const AddAuthor = () => (
	<Sheet>
		{({ onClose }) => (
			<>
				<SheetTrigger asChild>
					<Button>
						<i className="hgi hgi-stroke hgi-plus-sign" />
						<span>Create Author</span>
					</Button>
				</SheetTrigger>
				<SheetModal>
					<SheetHeader>
						<SheetTitle>Create Author</SheetTitle>
					</SheetHeader>
					<SheetContent>
						<CreateAuthorForm onSubmit={onClose} />
					</SheetContent>
				</SheetModal>
			</>
		)}
	</Sheet>
);

const DeleteAuthors = ({
	authors,
	setAuthors,
}: {
	authors: RowSelectionState;
	setAuthors: (values: RowSelectionState) => void;
}) =>
	Object.keys(authors).length > 0 && (
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
									their associated data from the system. This cannot be undone.
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
	);

Author.layout = (page: React.ReactElement) => (
	<AdminLayout className="space-y-4">{page}</AdminLayout>
);
