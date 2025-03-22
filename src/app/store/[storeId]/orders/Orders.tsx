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
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

export function Orders() {
	const { orders, isLoading } = useGetOrders()
	const [filterKey, setFilteredKey] = useState('id')

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
						<Select onValueChange={(value) => setFilteredKey(value)}>
							<SelectTrigger className={`w-[150px] ${filterKey === 'status' && 'mb-4'}`}>
								<SelectValue placeholder='Поиск по:' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='id'>ID</SelectItem>
								<SelectItem value='name'>Имя</SelectItem>
								<SelectItem value='email'>Почта</SelectItem>
								<SelectItem value='phone'>Телефон</SelectItem>
								<SelectItem value='social'>Телеграм</SelectItem>
								<SelectItem value='status'>Статус</SelectItem>
							</SelectContent>
						</Select>
						{filterKey === 'status' && <>
							<ul>
								Список статусов:
								<li>
									Pending - Оформлено
								</li>
								<li>
									Confirmed - Обработан
								</li>
								<li>
									Canceled - Отклонён
								</li>
								<li>
									Payed - Оплачен
								</li>
								<li>
									Shipped - Отправлен
								</li>
								<li>
									Delivered - Доставлен
								</li>

							</ul>
						</>}
						<DataTable columns={orderColumns} data={formattedOrders} filterKey={filterKey} />
					</div>
				</>
			)}
		</div>
	)
}
