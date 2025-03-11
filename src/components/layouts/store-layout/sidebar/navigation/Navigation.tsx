'use client'

import { useParams } from 'next/navigation'
import { IMenuItem } from './menu.interface'
import { Album, BarChart, FolderKanban, Package2, Settings, Star, TicketPercent, Users } from 'lucide-react'
import { STORE_URL } from '@/config/url.config'
import styles from './Navigation.module.scss'
import { MenuItem } from './MenuItem'
import { CurrencySwitcher } from '../../header/CurrencySwitcher'
import { useProfile } from '@/hooks/useProfile'

export function Navigation() {
	const params = useParams<{ storeId: string }>()
	const { user, isLoading } = useProfile()

	// Определяем, какие ссылки показывать в зависимости от роли пользователя
	const filteredRoutes = [
		{
			icon: BarChart,
			link: STORE_URL.home(params.storeId),
			value: 'Статистика',
			roles: ['owner'],
		},
		{
			icon: FolderKanban,
			link: STORE_URL.products(params.storeId),
			value: 'Товары',
			roles: ['owner'],
		},
		{
			icon: Album,
			link: STORE_URL.categories(params.storeId),
			value: 'Категории',
			roles: ['owner'],
		},
		{
			icon: Star,
			link: STORE_URL.reviews(params.storeId),
			value: 'Отзывы',
			roles: ['owner'],
		},
		{
			icon: TicketPercent,
			link: STORE_URL.discounts(params.storeId),
			value: 'Промокоды',
			roles: ['owner'],
		},
		{
			icon: Users,
			link: STORE_URL.users(params.storeId),
			value: 'Пользователи',
			roles: ['owner'],
		},
		{
			icon: Package2,
			link: STORE_URL.orders(params.storeId),
			value: 'Заказы',
			roles: ['owner'],
		},
		{
			icon: Package2,
			link: STORE_URL.home(),
			value: 'Заказы',
			roles: ['moderator'],
		},
		{
			icon: TicketPercent,
			link: STORE_URL.discounts(),
			value: 'Промокоды',
			roles: ['moderator'],
		},
		{
			icon: Settings,
			link: STORE_URL.settings(params.storeId),
			value: 'Настройки коллекции',
			roles: ['owner'],
		},
	].filter((route) => user?.role && route.roles.includes(user.role)) // Фильтрация по роли

	return (
		<div className={styles.wrapper}>
			<div className={styles.navigation}>
				<CurrencySwitcher className='flex lg:hidden' />

				{filteredRoutes.map((route) => (
					<MenuItem key={route.value} route={route} />
				))}
			</div>
		</div>
	)
}
