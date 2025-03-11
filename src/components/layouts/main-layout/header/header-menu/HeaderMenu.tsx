'use client'

import { useState } from 'react'
import { useProfile } from '@/hooks/useProfile'
import styles from './HeaderMenu.module.scss'
import { HeaderCart } from './header-cart/HeaderCart'
import Link from 'next/link'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { LogOut, Menu, MenuIcon } from 'lucide-react'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import Image from 'next/image'
import { CurrencySwitcher } from '@/components/layouts/store-layout/header/CurrencySwitcher'
import { StoreSwitcher } from '@/components/layouts/store-layout/header/StoreSwitcher'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.header_menu}>
			<HeaderCart />

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button size='icon' variant='ghost'>
						<MenuIcon className='size-4' />
					</Button>
				</SheetTrigger>
				<SheetContent className={styles.menu} side='right'>
					<SheetTitle>Меню</SheetTitle>
					<CurrencySwitcher />
					{user && (
						<>
							{user.stores.length && user.role === 'owner' ? (
								<StoreSwitcher items={user.stores} />
							) : user.role === 'owner' ? (
								<CreateStoreModal>
									<Button variant='ghost'>Создать магазин</Button>
								</CreateStoreModal>
							) : user.role === 'moderator' ? (
								<Link href={STORE_URL.home()}>
									<Button>Модератор</Button>
								</Link>
							) : null}
						</>
					)}
					<Link href={PUBLIC_URL.explorer()}>
						<Button onClick={() => setOpen(false)} variant='ghost'>
							Каталог
						</Button>
					</Link>

					{user && (
						<>
							<Link href={DASHBOARD_URL.favorites()}>
								<Button onClick={() => setOpen(false)} variant='ghost'>
									Избранное
								</Button>
							</Link>

							{/* <HeaderCart /> */}
						</>
					)}

					<div className='sm:hidden flex'>
						{isLoading ? (
							<Loader size='sm' />
						) : user ? (
							<Link className='w-full' href={DASHBOARD_URL.home()}>
								<Button onClick={() => setOpen(false)} variant='ghost'>
									Личный кабинет
								</Button>
							</Link>
						) : (
							<Link className='w-full' href={PUBLIC_URL.auth()}>
								<Button>
									<LogOut className={styles.icon} /> Войти
								</Button>
							</Link>
						)}
					</div>
				</SheetContent>
			</Sheet>

			{isLoading ? (
				<Loader size='sm' />
			) : user ? (
				<Link className='sm:flex hidden' href={DASHBOARD_URL.home()}>
					<Image src={user.picture} alt={user.name} width={42} height={42} className={styles.avatar} />
				</Link>
			) : (
				<Link className='sm:flex hidden' href={PUBLIC_URL.auth()}>
					<Button>
						<LogOut className={styles.icon} /> Войти
					</Button>
				</Link>
			)}
		</div>
	)
}
