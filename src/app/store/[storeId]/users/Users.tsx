'use client'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { useGetUsers } from '@/hooks/queries/users/useGetUsers'
import { IUserColumns, userColumns } from './UserColumns'
import { useProfile } from '@/hooks/useProfile'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

export function Users() {
	const { users, isLoading } = useGetUsers()
	const { user } = useProfile()
		const [filterKey, setFilteredKey] = useState('name')
	

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
					<Select onValueChange={(value) => setFilteredKey(value)}>
							<SelectTrigger className='w-[150px] mt-4'>
								<SelectValue placeholder='Поиск по:' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='id'>ID</SelectItem>
								<SelectItem value='name'>Имя</SelectItem>
								<SelectItem value='email'>Почта</SelectItem>
								<SelectItem value='phone'>Телефон</SelectItem>
								<SelectItem value='role'>Роль</SelectItem>
								<SelectItem value='social'>Телеграм</SelectItem>
							</SelectContent>
						</Select>
					<div className={styles.table}>
						<DataTable columns={userColumns} data={formattedUsers} filterKey={filterKey} />
					</div>
				</>
			)}
		</div>
	)
}
