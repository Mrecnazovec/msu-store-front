import { SITE_DESCRIPTION } from '@/constants/seo.constants'
import styles from './Hero.module.scss'
import { ArrowRight } from 'lucide-react'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function Hero() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>
				Для людей Московского университета - <span>всё в одном месте</span>
			</h1>
			<p className={styles.description}>{SITE_DESCRIPTION}</p>
			<Link href={PUBLIC_URL.explorer()}>
				<Button>
					За покупками <ArrowRight />
				</Button>
			</Link>
		</div>
	)
}
