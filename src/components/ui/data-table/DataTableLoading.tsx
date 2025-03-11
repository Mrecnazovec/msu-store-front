import { FC } from 'react'
import styles from './DataTable.module.scss'
import { Skeleton } from '../Skeleton'
import { Card, CardContent } from '../Card'
import { Loader } from '../Loader'

const DataTableLoading: FC = () => {
	return (
		<div className={styles.loading}>
			<Skeleton className={styles.heading} />
			<Skeleton className={styles.search} />
			<Card className={styles.table}>
				<CardContent>
					<div className={styles.loader_wrapper}>
						<Loader />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default DataTableLoading
