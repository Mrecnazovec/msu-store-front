import type { PropsWithChildren } from 'react'

import styles from './StoreLayout.module.scss'
import { SideBar } from './sidebar/SideBar'
import { Header } from './header/Header'

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<SideBar />
				</div>
				<div className={styles.header}>
					<Header />
				</div>
				<main>{children}</main>
			</div>
		</div>
	)
}
