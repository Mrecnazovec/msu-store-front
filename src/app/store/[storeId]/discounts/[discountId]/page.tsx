import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DiscountEdit } from './DiscountEdit'

export const metadata: Metadata = {
	title: 'Настройка промокода',
	...NO_INDEX_PAGE,
}

export default function DiscountEditPage() {
	return <DiscountEdit />
}
