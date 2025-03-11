import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateDiscount } from '../../[storeId]/discounts/create/CreateDiscount'

export const metadata: Metadata = {
	title: 'Создание промокода',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <CreateDiscount />
}
