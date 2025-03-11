import styles from './Footer.module.scss'

export function Footer() {
	return (
		<div className={styles.wrapper}>
			<footer className={styles.footer}>
				msu-store.com &copy; 2025 все права защищены
			</footer>
		</div>
	)
}
