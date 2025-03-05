import { Head } from '@inertiajs/react';
import { AdminLayout } from '../layout';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import { TrendLineChart } from '../components/trend-line-chart';

export default function Dashboard() {
	return (
		<>
			<Head title="Dashboard" />
			<div className="grid gap-4 @lg:grid-cols-2 @4xl:grid-cols-4">
				<Card>
					<CardHeader className="items-end justify-between border-b border-border">
						<CardDescription className="font-space text-2xl text-foreground">
							$50,012
						</CardDescription>
						<CardTitle className="font-normal text-muted-foreground">
							Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<TrendLineChart
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
							gradientLength={15}
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="items-end justify-between border-b border-border">
						<CardDescription className="font-space text-2xl text-foreground">
							210
						</CardDescription>
						<CardTitle className="font-normal text-muted-foreground">
							Orders
						</CardTitle>
					</CardHeader>
					<CardContent>
						<TrendLineChart
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
							gradientLength={15}
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="items-end justify-between border-b border-border">
						<CardDescription className="font-space text-2xl text-foreground">
							$1,990
						</CardDescription>
						<CardTitle className="font-normal text-muted-foreground">
							Refunds
						</CardTitle>
					</CardHeader>
					<CardContent>
						<TrendLineChart
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
							gradientLength={15}
							reverseGradient
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="items-end justify-between border-b border-border">
						<CardDescription className="font-space text-2xl text-foreground">
							3955
						</CardDescription>
						<CardTitle className="font-normal text-muted-foreground">
							Users
						</CardTitle>
					</CardHeader>
					<CardContent>
						<TrendLineChart
							data={[
								{ name: 'Jan', pv: 200 },
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
							gradientLength={15}
						/>
					</CardContent>
				</Card>
			</div>
			<Card></Card>
		</>
	);
}

Dashboard.layout = (page: React.ReactElement) => (
	<AdminLayout className="@container space-y-8">{page}</AdminLayout>
);
