'use client'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { useGetUsers } from '@/hooks/queries/users/useGetUsers'
import { IUserColumns, userColumns } from './UserColumns'
import { useProfile } from '@/hooks/useProfile'

export function Users() {
	const { users, isLoading } = useGetUsers()
	const { user } = useProfile()

	const formattedUsers: IUserColumns[] =
		users?.data && Array.isArray(users.data)
			? users.data
					.filter((u) => u.id !== user?.id)
					.map((user) => ({
						id: user.id,
						name: user.name,
						email: user.email,
						phone: user.phone,
						role: user.role,
						social: user.social,
					}))
			: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading title={`Пользователи ${formattedUsers.length}`} description='Все Пользователи' />
					</div>
					<div className={styles.table}>
						<DataTable columns={userColumns} data={formattedUsers} filterKey='name' />
					</div>
				</>
			)}
		</div>
	)
}
