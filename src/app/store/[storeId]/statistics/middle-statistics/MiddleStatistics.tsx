'use client'

import { useGetStatistics } from '@/hooks/statistics/useGetStatistics'

import styles from './MiddleStatistics.module.scss'
import { Loader } from '@/components/ui/Loader'
import { Overview } from './Overview'
import { LastUsers } from './LastUsers'
import { useGeo } from '@/hooks/queries/geo/useGeo'

export function MiddleStatistics() {
	const { middle, middleStatisticsLoading } = useGetStatistics()
	const { geo } = useGeo()

	return (
		<div className={styles.middle}>
			{middle?.monthlySales.length && middle?.lastUsers.length ? (
				<>
					<div className={styles.overview}>
						<Overview data={middle.monthlySales} currency={geo} />
					</div>
					<div className={styles.last_users}>
						<LastUsers data={middle.lastUsers} currency={geo} />
					</div>
				</>
			) : (
				<div>Нет данных для статистики</div>
			)}
		</div>
	)
}
