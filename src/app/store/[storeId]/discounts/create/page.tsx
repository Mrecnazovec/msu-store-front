import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateDiscount } from './CreateDiscount'

export const metadata: Metadata = {
	title: 'Создание промокода',
	...NO_INDEX_PAGE,
}

export default function CreateDiscountPage() {
	return <CreateDiscount />
}
