'use client'

import { useParams } from 'next/navigation'
import { IReviewColumn, reviewColumns } from './ReviewColumns'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { formatDate } from '@/utils/date/format-date'
import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews'

export function Reviews() {
	const params = useParams<{ storeId: string }>()

	const { reviews, isLoading } = useGetReviews()

	const formattedReviews: IReviewColumn[] = reviews
		? reviews.map((review) => ({
				id: review.id,
				createdAt: formatDate(review.createdAt),
				rating: Array.from({ length: review.rating })
					.map(() => '⭐')
					.join(' '),
				username: review.user.name,
		  }))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading title={`Отзывы ${reviews?.length}`} description='Все отзывы' />
					</div>
					<div className={styles.table}>
						<DataTable columns={reviewColumns} data={formattedReviews} filterKey='username' />
					</div>
				</>
			)}
		</div>
	)
}
