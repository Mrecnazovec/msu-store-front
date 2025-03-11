'use client'

import { useGetDiscounts } from '@/hooks/queries/discounts/useGetDiscount'
import { useParams } from 'next/navigation'
import { discountColumns } from './DiscountColumns'
import { useGeo } from '@/hooks/queries/geo/useGeo'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import Link from 'next/link'
import { STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { IDiscount } from '@/shared/types/discount.interface'
import { formatDate } from '@/utils/date/format-date'

export function Discounts() {
	const params = useParams<{ storeId: string }>()

	const { discounts, isLoading } = useGetDiscounts()

	const formattedDiscounts: IDiscount[] = discounts
		? discounts.map((discount) => ({
				id: discount.id,
				createdAt: formatDate(discount.createdAt),
				name: discount.name,
				discount: discount.discount,
				quantity: discount.quantity,
				storeId: params.storeId,
		  }))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading title={`Скидки ${discounts?.length}`} description='Все скидки' />
						<div className={styles.buttons}>
							<Link href={STORE_URL.discountCreate(params.storeId)}>
								<Button>
									<Plus />
									<p className='mt-0.5'>Создать</p>
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable columns={discountColumns} data={formattedDiscounts} filterKey='name' />
					</div>
				</>
			)}
		</div>
	)
}
