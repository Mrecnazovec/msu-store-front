import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import styles from '../hero/Hero.module.scss'
import { PUBLIC_URL } from '@/config/url.config'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Спасибо за покупку',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>
				Спасибо за покупку
			</h1>
			<p className={styles.description}>
				Спасибо за ваш заказ! В ближайшее время с вами свяжется наш менеджер 
			</p>
			<Link href={PUBLIC_URL.home()}>
				<Button>
					На главную <ArrowRight />
				</Button>
			</Link>
		</div>
	)
}
