import { useGetStatistics } from '@/hooks/statistics/useGetStatistics'
import styles from './MainStatistics.module.scss'
import { MainStatisticsItem } from './MainStatisticsItem'
import { Loader } from '@/components/ui/Loader'

export function MainStatistics() {
	const { main, mainStatisticsLoading } = useGetStatistics()
	return (
		<div className={styles.main}>
			{mainStatisticsLoading ? (
				<Loader size='default' />
			) : (
				<>{main?.length ? main.map((item) => <MainStatisticsItem key={item.id} item={item} />) : <div>Нет данных для статистики</div>}</>
			)}
		</div>
	)
}
