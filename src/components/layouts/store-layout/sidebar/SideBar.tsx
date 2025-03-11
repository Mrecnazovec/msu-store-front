import { Logo } from '../../main-layout/header/logo/Logo'
import { Navigation } from './navigation/Navigation'
import styles from './SideBar.module.scss'

export function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<Navigation />
		</div>
	)
}
