import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Discounts } from './Discounts'

export const metadata: Metadata = {
	title: 'Промокоды',
	...NO_INDEX_PAGE,
}

export default function DiscountsPage() {
	return <Discounts />
}
