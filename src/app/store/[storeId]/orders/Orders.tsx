'use client'

import { IOrderColumns, orderColumns } from './OrderColumns'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { formatDate } from '@/utils/date/format-date'
import { useGetOrders } from '@/hooks/queries/orders/useGetOrders'
import { IOrder } from '@/shared/types/order.interface'
import { formatPrice } from '@/utils/string/format-price'

export function Orders() {
	const { orders, isLoading } = useGetOrders()

	console.log(orders)

	const formattedOrders: IOrderColumns[] =
		orders?.data && Array.isArray(orders.data)
			? orders?.data.map((order) => ({
					id: order.id,
					createdAt: formatDate(order.createdAt),
					status: order.status,
					total: formatPrice(order.total, order.currency),
					name: order.user.name,
					email: order.user.email,
					phone: order.user.phone,
					social: order.user.social,
					items: order.items,
			  }))
			: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading title={`Заказы ${orders?.data?.length}`} description='Все заказы' />
					</div>
					<div className={styles.table}>
						<DataTable columns={orderColumns} data={formattedOrders} filterKey='id' />
					</div>
				</>
			)}
		</div>
	)
}
