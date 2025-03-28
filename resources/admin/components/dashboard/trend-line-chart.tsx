import { useMemo, useId } from 'react';
import { ResponsiveContainer, LineChart, Line, Dot, type DotProps } from 'recharts';

type DataPoint = { name: string; pv: number };

type Props = {
	data: DataPoint[];
	gradientLength?: number;
	reverseGradient?: boolean;
};

type CustomDotProps = DotProps & {
	isLastPoint: boolean;
	dotColor: string;
};

const CustomDot = ({ cx, cy, isLastPoint, dotColor }: CustomDotProps) => {
	return isLastPoint ? (
		<Dot cx={cx} cy={cy} r={4} fill="var(--card)" stroke={dotColor} strokeWidth={2} />
	) : null;
};

export const TrendLineChart = ({ data, gradientLength = 5, reverseGradient = false }: Props) => {
	const lastPoint = data[data.length - 1];
	const isUpward = lastPoint.pv > data[data.length - 2].pv;

	// Determine gradient & dot color based on trend and reversal setting
	const dotColor = isUpward === reverseGradient ? 'var(--chart-red)' : 'var(--chart-green)';

	// Gradient settings
	const safeGradientLength = Math.min(Math.max(gradientLength, 1), 50);
	const startGradient = 100 - safeGradientLength;
	const denseGradient = startGradient + safeGradientLength * 0.6;

	const gradientId = useId();
	const gradientStops = useMemo(
		() => (
			<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stopColor="white" />
				<stop offset={`${startGradient}%`} stopColor="white" />
				<stop
					offset={`${denseGradient}%`}
					stopColor={`color-mix(in hsl, ${dotColor} 70%, transparent)`}
				/>
				<stop offset="100%" stopColor={dotColor} />
			</linearGradient>
		),
		[dotColor, startGradient, denseGradient, gradientId],
	);

	return (
		<ResponsiveContainer width="100%" height={80}>
			<LineChart data={data}>
				<defs>{gradientStops}</defs>
				<Line
					type="monotone"
					dataKey="pv"
					stroke={`url(#${gradientId})`}
					strokeWidth={2}
					dot={props => {
						// eslint-disable-next-line react/prop-types
						const { key, ...rest } = props;
						return (
							<CustomDot
								key={key}
								{...rest}
								isLastPoint={
									// eslint-disable-next-line react/prop-types
									!!(props.payload.name === lastPoint.name)
								}
								dotColor={dotColor}
							/>
						);
					}}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
