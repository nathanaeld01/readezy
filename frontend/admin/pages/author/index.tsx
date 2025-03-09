import { CreateAuthorForm } from '@/admin/components/forms/author/create';
import { AdminLayout } from '@/admin/layout';
import { Head } from '@inertiajs/react';

export default function Author() {
	return (
		<>
			<Head title="Authors" />
			<div className="flex items-center justify-between">
				<h2 className="text-2xl/none font-semibold">Authors</h2>
				<div className="flex items-center gap-2">
					<CreateAuthorForm />
				</div>
			</div>
		</>
	);
}

Author.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>;
