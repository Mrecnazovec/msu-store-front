'use client'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategory'
import { useParams } from 'next/navigation'
import { categoryColumns } from './CategoryColumns'
import { useGeo } from '@/hooks/queries/geo/useGeo'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import Link from 'next/link'
import { STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { ICategory } from '@/shared/types/category.interface'
import { formatDate } from '@/utils/date/format-date'

export function Categories() {
	const params = useParams<{ storeId: string }>()
	const { geo } = useGeo()

	const { categories, isLoading } = useGetCategories()

	const formattedCategories: ICategory[] = categories
		? categories.map((category) => ({
				id: category.id,
				createdAt: formatDate(category.createdAt),
				title: category.title,
				description: category.description.split(' ').slice(0, 3).join(' ') + '...',
				storeId: category.storeId,
		  }))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading title={`Категории ${categories?.length}`} description='Все категории вашей коллекции' />
						<div className={styles.buttons}>
							<Link href={STORE_URL.categoryCreate(params.storeId)}>
								<Button>
									<Plus />
									<p className='mt-0.5'>Создать</p>
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable columns={categoryColumns} data={formattedCategories} filterKey='title' />
					</div>
				</>
			)}
		</div>
	)
}
