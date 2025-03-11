import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Orders } from './[storeId]/orders/Orders'

export const metadata: Metadata = {
	title: 'Заказы',
	...NO_INDEX_PAGE,
}

export default function OrdersPage() {
	return <Orders />
}
