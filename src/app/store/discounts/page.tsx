import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Discounts } from '../[storeId]/discounts/Discounts'

export const metadata: Metadata = {
	title: 'Промокоды',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <Discounts />
}
