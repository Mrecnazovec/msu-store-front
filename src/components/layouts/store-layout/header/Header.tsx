'use client'
import Link from 'next/link'
import { MobileSideBar } from '../sidebar/MobileSideBar'
import styles from './Header.module.scss'
import { useProfile } from '@/hooks/useProfile'
import { DASHBOARD_URL, STORE_URL } from '@/config/url.config'
import Image from 'next/image'
import { Loader } from '@/components/ui/Loader'
import { StoreSwitcher } from './StoreSwitcher'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import { CurrencySwitcher } from './CurrencySwitcher'

export function Header() {
	const { user, isLoading } = useProfile()
	const { geo, isLoading: geoLoading } = useGeo()


	return (
		<div className={styles.header}>
			<MobileSideBar />
			<div className={styles.header_menu}>
				{isLoading ? (
					<Loader size={'sm'} />
				) : (
					user && (
						<>
							<CurrencySwitcher className='hidden lg:flex' />
							{user.role === 'owner' ? (
								<StoreSwitcher items={user.stores} />
							) : user.role === 'moderator' ? (
								<Link href={STORE_URL.home()}>Модератор</Link>
							) : (
								''
							)}
							<Link href={DASHBOARD_URL.home()}>
								<Image src={user.picture} alt={user.name} width={42} height={42} />
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}
