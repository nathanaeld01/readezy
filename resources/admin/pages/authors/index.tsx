import { Head } from '@inertiajs/react';
import { RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';

import { AddAuthor } from '@/admin/components/add-author';
import { DeleteAuthors } from '@/admin/components/delete-authors';
import { ListAuthors } from '@/admin/components/list-authors';
import { AdminLayout } from '@/admin/layouts/admin';

export default function Authors() {
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
			<ListAuthors onSelect={setSelectedAuthors} selected={selectedAuthors} />
		</>
	);
}

Authors.layout = (page: React.ReactElement) => (
	<AdminLayout className="space-y-4">{page}</AdminLayout>
);
