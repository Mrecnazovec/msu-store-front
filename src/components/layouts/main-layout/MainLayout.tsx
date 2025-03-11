import { PropsWithChildren } from 'react'

import styles from './MainLayout.module.scss'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</div>
	)
}
