import { Head } from '@inertiajs/react';

import { AdminLayout } from '../layouts/admin';

export default function Error() {
	return (
		<>
			<Head title="Not Found" />
			<div className="m-auto flex size-fit items-center gap-8">
				<i className="hgi hgi-stroke hgi-bug-02 text-9xl/none" />
				<div className="h-25 w-px bg-accent" />
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl/none font-bold">404</h1>
					<p className="text-lg/none">Page not found</p>
				</div>
			</div>
		</>
	);
}

Error.layout = (page: React.ReactElement) => (
	<AdminLayout className="flex p-0 pb-16">{page}</AdminLayout>
);
