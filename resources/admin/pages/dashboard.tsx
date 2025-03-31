import { Head } from '@inertiajs/react';

import { MetricCard } from '../components/dashboard/metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AdminLayout } from '../layouts/admin';

export default function Dashboard() {
	return (
		<>
			<Head title="Dashboard" />
			<div className="@container grid grid-cols-12 gap-4">
				<MetricCard
					data={[
						{ name: 'Jan', pv: 2400 },
						{ name: 'Feb', pv: 1398 },
						{ name: 'Mar', pv: 9800 },
						{ name: 'Apr', pv: 3908 },
						{ name: 'May', pv: 4800 },
						{ name: 'Jun', pv: 3800 },
						{ name: 'Jul', pv: 4300 },
						{ name: 'Aug', pv: 2400 },
						{ name: 'Sep', pv: 1398 },
						{ name: 'Oct', pv: 9800 },
						{ name: 'Nov', pv: 3908 },
						{ name: 'Dec', pv: 4800 },
					]}
					title="Revenue"
					value="$50,012"
				/>
				<MetricCard
					data={[
						{ name: 'Jan', pv: 300 },
						{ name: 'Feb', pv: 370 },
						{ name: 'Mar', pv: 460 },
						{ name: 'Apr', pv: 520 },
						{ name: 'May', pv: 450 },
						{ name: 'Jun', pv: 390 },
						{ name: 'Jul', pv: 340 },
						{ name: 'Aug', pv: 345 },
						{ name: 'Sep', pv: 355 },
						{ name: 'Oct', pv: 310 },
						{ name: 'Nov', pv: 260 },
						{ name: 'Dec', pv: 215 },
					]}
					title="Orders"
					value={210}
				/>
				<MetricCard
					data={[
						{ name: 'Jan', pv: 169 },
						{ name: 'Feb', pv: 263 },
						{ name: 'Mar', pv: 60 },
						{ name: 'Apr', pv: 111 },
						{ name: 'May', pv: 318 },
						{ name: 'Jun', pv: 270 },
						{ name: 'Jul', pv: 84 },
						{ name: 'Aug', pv: 216 },
						{ name: 'Sep', pv: 270 },
						{ name: 'Oct', pv: 98 },
						{ name: 'Nov', pv: 52 },
						{ name: 'Dec', pv: 79 },
					]}
					reverse
					title="Refunds"
					value="$1,990"
				/>
				<MetricCard
					data={[
						{ name: 'Jan', pv: 200 },
						{ name: 'Feb', pv: 370 },
						{ name: 'Mar', pv: 460 },
						{ name: 'Apr', pv: 498 },
						{ name: 'May', pv: 450 },
						{ name: 'Jun', pv: 300 },
						{ name: 'Jul', pv: 340 },
						{ name: 'Aug', pv: 345 },
						{ name: 'Sep', pv: 355 },
						{ name: 'Oct', pv: 310 },
						{ name: 'Nov', pv: 260 },
						{ name: 'Dec', pv: 327 },
					]}
					title="Users"
					value={3955}
				/>
			</div>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-9"></div>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Popular Books</CardTitle>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>
		</>
	);
}

Dashboard.layout = (page: React.ReactElement) => (
	<AdminLayout className="space-y-8">{page}</AdminLayout>
);
