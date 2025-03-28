import { TrendLineChart } from './trend-line-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type Props = {
	data: { name: string; pv: number }[];
	title: string;
	value: number | string;
	reverse?: boolean;
};

export const MetricCard = ({ data, title, value, reverse }: Props) => (
	<Card className="col-span-full @lg:col-span-6 @4xl:col-span-3">
		<CardHeader className="items-end justify-between">
			<CardDescription className="font-space text-2xl text-foreground">
				{value}
			</CardDescription>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<TrendLineChart data={data} gradientLength={15} reverseGradient={reverse} />
		</CardContent>
	</Card>
);
