import { Head } from '@inertiajs/react';
import { AdminLayout } from '../layout';

export default function Notifications() {
	return (
		<>
			<Head title="Notifications" />
		</>
	);
}

Notifications.layout = (page: React.ReactElement) => (
	<AdminLayout>{page}</AdminLayout>
);
