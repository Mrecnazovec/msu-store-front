import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { IMainStatistics } from '@/shared/types/statistics.interface'
import { getIcon } from './statistics.util'
import CountUp from 'react-countup'
import styles from './MainStatistics.module.scss'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import { formatPrice } from '@/utils/string/format-price'

interface MainStatisticsItemProps {
	item: IMainStatistics
}

export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
	const Icon = getIcon(item.id)
	const { geo } = useGeo()

	return (
		<Card className={styles.card}>
			<CardHeader className={styles.header}>
				<CardTitle>{item.name}</CardTitle>
				<Icon />
			</CardHeader>
			<CardContent className={styles.content}>
				<h2>{item.id !== 1 ? <CountUp end={item.value} /> : <CountUp end={item.value} formattingFn={(value) => formatPrice(value, geo)} />}</h2>
			</CardContent>
		</Card>
	)
}
