import { Head } from '@inertiajs/react';

import { Button } from '@/admin/components/ui/button';
import { AdminLayout } from '@/admin/layouts';

export default function Book() {
	return (
		<>
			<Head title="Books" />
			<div className="flex items-center justify-between">
				<h2 className="text-2xl/none font-semibold">Books</h2>
				<div className="flex items-center gap-2">
					<Button>
						<i className="hgi hgi-stroke hgi-plus-sign" />
						<span>Add Book</span>
					</Button>
				</div>
			</div>
		</>
	);
}

Book.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>;
