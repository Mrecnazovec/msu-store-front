import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/Chart'
import { IMonthlySales } from '@/shared/types/statistics.interface'

import styles from './MiddleStatistics.module.scss'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { formatPrice } from '@/utils/string/format-price'

const chartConfig = {
	value: {
		label: 'Прибыль',
		color: '#1D00C3',
	},
} satisfies ChartConfig

interface OverviewProps {
	data: IMonthlySales[]
	currency: string
}

export function Overview({ data, currency }: OverviewProps) {
	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Прибыль</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer className='aspect-auto h-[310px] w-full' config={chartConfig}>
					<AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} />
						<ChartTooltip content={<ChartTooltipContent indicator='line' />} />
						<Area dataKey='value' type='natural' fill='var(--color-value)' stroke='var(--color-value)' />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
