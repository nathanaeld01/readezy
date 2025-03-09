import { Button } from '@/admin/components/ui/button';
import { AdminLayout } from '@/admin/layout';
import { Head } from '@inertiajs/react';

export default function Author() {
	return (
		<>
			<Head title="Authors" />
			<div className="flex items-center justify-between">
				<h2 className="text-2xl/none font-semibold">Authors</h2>
				<div className="flex items-center gap-2">
					<Button>
						<i className="hgi hgi-stroke hgi-plus-sign" />
						<span>Add Author</span>
					</Button>
				</div>
			</div>
		</>
	);
}

Author.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>;
