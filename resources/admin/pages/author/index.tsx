import { Head } from '@inertiajs/react';
import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';

import { AdminLayout } from '@/admin/layouts';
import { CreateSheet } from '@/admin/components/create-sheet';
import { CreateAuthorForm, DeleteAuthorsForm } from '@/admin/components/forms/author';
import { ViewAuthorsTable } from '@/admin/components/author/view-table';

export default function Author() {
	const [selectedAuthors, setSelectedAuthors] = useState<RowSelectionState>({});

	return (
		<>
			<Head title="Authors" />
			<div className="flex items-center justify-between">
				<h2 className="text-2xl/none font-semibold">Authors</h2>
				<div className="flex items-center gap-2">
					<DeleteAuthorsForm
						onReset={() => setSelectedAuthors({})}
						selectedAuthors={Object.keys(selectedAuthors)}
					/>
					<CreateSheet title="Create Author" trigger="Create Author">
						{({ setOpen }) => <CreateAuthorForm onSubmit={() => setOpen(false)} />}
					</CreateSheet>
				</div>
			</div>
			<ViewAuthorsTable selected={selectedAuthors} onSelect={setSelectedAuthors} />
		</>
	);
}

Author.layout = (page: React.ReactElement) => (
	<AdminLayout className="space-y-4">{page}</AdminLayout>
);
