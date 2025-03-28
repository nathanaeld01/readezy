import { Head } from '@inertiajs/react';

import { AdminLayout } from '../layouts';

export default function Notifications() {
	return (
		<>
			<Head title="Notifications" />
		</>
	);
}

Notifications.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>;
