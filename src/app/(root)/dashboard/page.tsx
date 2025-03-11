import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Dashboard } from './Dashboard'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Личный кабинет',
	...NO_INDEX_PAGE,
}

export default function DashboardPage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Dashboard />
		</Suspense>
	)
}
