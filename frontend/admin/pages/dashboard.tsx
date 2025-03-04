import { Head } from '@inertiajs/react';
import { AdminLayout } from '../layout';
import { Card } from '../components/ui/card';

export default function Dashboard() {
	return (
		<>
			<Head title="Dashboard" />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card></Card>
				<Card></Card>
				<Card></Card>
				<Card></Card>
			</div>
			<Card></Card>
		</>
	);
}

Dashboard.layout = (page: React.ReactElement) => (
	<AdminLayout className="space-y-8">{page}</AdminLayout>
);
