'use client'

import { useProfile } from '@/hooks/useProfile'
import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { IOrderColumns, orderColumns } from './OrderColumns'
import { formatDate } from '@/utils/date/format-date'
import { formatPrice } from '@/utils/string/format-price'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import styles from './Dashboard.module.scss'
import { Button } from '@/components/ui/Button'
import { LogOut, Pencil } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'
import toast from 'react-hot-toast'
import { PUBLIC_URL } from '@/config/url.config'
import { UserModal } from '@/components/ui/modals/UserModal'

export function Dashboard() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const queryClient = useQueryClient()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) {
			saveTokenStorage(accessToken)
		}
	}, [searchParams])

	const { user } = useProfile()

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['profile'],
			})
			toast.success('Успешный выход из системы')
			router.push('/auth')
		},
	})

	if (!user) return null


	const formattedOrder: IOrderColumns[] = user.orders.map((order) => ({
		createdAt: formatDate(order.createdAt),
		status: order.status,
		total: formatPrice(order.total, order.currency),
		items: order.items,
	}))

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h1>Ваши заказы</h1>
				<UserModal>
					<Button variant='secondary'>
						<Pencil />
						Изменить информацию
					</Button>
				</UserModal>
				<Button onClick={() => logout()}>
					<LogOut />
					Выйти
				</Button>
			</div>
			<DataTable columns={orderColumns} data={formattedOrder} />
		</div>
	)
}
