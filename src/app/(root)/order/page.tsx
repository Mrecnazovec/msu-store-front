import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Order } from './Order'

export const metadata: Metadata = {
	title: 'Заказ',
	...NO_INDEX_PAGE
}

export default function OrderPage() {
	return <Order/>
}
